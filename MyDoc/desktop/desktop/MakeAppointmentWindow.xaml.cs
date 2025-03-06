using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;

namespace desktop
{
    public partial class MakeAppointmentWindow : Window
    {
        private readonly HttpClient httpClient = new HttpClient();
        private Doctor selectedDoctor;

        public MakeAppointmentWindow(Doctor doctor)
        {
            InitializeComponent();
            selectedDoctor = doctor;
            InitializeAppointmentDetails();
        }

        private void InitializeAppointmentDetails()
        {
            // Set doctor details
            DoctorNameTextBox.Text = selectedDoctor.Name;
            AvailableTimeTextBox.Text = selectedDoctor.AvailableTime;

            // Disable confirm button initially
            ConfirmButton.IsEnabled = false;

            // Limit date selection
            AppointmentDatePicker.DisplayDateStart = DateTime.Today;
            AppointmentDatePicker.DisplayDateEnd = DateTime.Today.AddMonths(3);

            // Add event handlers for validation
            AppointmentDatePicker.SelectedDateChanged += ValidateAppointment;
            TimeComboBox.SelectionChanged += ValidateAppointment;
        }

        private void ValidateAppointment(object sender, RoutedEventArgs e)
        {
            // Enable confirm button only when both date and time are selected
            ConfirmButton.IsEnabled =
                AppointmentDatePicker.SelectedDate.HasValue &&
                TimeComboBox.SelectedItem != null;
        }

        private void AppointmentDatePicker_SelectedDateChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (AppointmentDatePicker.SelectedDate.HasValue)
            {
                // Generate time options based on available time
                GenerateTimeOptions(selectedDoctor.AvailableTime);
                TimeComboBox.IsEnabled = true;
            }
        }

        private void GenerateTimeOptions(string timeRange)
        {
            TimeComboBox.Items.Clear();

            try
            {
                // Normalize time range string
                timeRange = timeRange.ToLower().Trim();

                // Parse time range (e.g., "3pm-6pm")
                var times = timeRange.Split('-');
                if (times.Length != 2)
                {
                    MessageBox.Show($"Invalid time range format: {timeRange}", "Time Slot Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                // Detailed parsing to handle various time formats
                DateTime startTime = ParseTimeString(times[0]);
                DateTime endTime = ParseTimeString(times[1]);

                // Ensure start time is before end time
                if (startTime >= endTime)
                {
                    MessageBox.Show($"Invalid time range: Start time must be before end time", "Time Slot Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                // Generate 20-minute intervals
                while (startTime < endTime)
                {
                    TimeComboBox.Items.Add(startTime.ToString("HH:mm"));
                    startTime = startTime.AddMinutes(20);
                }

                // Debugging: Log generated time slots
                System.Diagnostics.Debug.WriteLine($"Generated {TimeComboBox.Items.Count} time slots");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error generating time slots: {ex.Message}", "Time Slot Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private DateTime ParseTimeString(string timeStr)
        {
            // Remove any whitespace
            timeStr = timeStr.Trim();

            // Handle different time formats
            if (timeStr.EndsWith("am", StringComparison.OrdinalIgnoreCase) ||
                timeStr.EndsWith("pm", StringComparison.OrdinalIgnoreCase))
            {
                // 12-hour format
                var match = System.Text.RegularExpressions.Regex.Match(timeStr, @"(\d+)(am|pm)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                if (match.Success)
                {
                    int hour = int.Parse(match.Groups[1].Value);
                    string period = match.Groups[2].Value.ToLower();

                    if (period == "pm" && hour != 12)
                        hour += 12;
                    else if (period == "am" && hour == 12)
                        hour = 0;

                    return DateTime.Today.Date.AddHours(hour);
                }
            }
            else
            {
                // 24-hour format
                return DateTime.ParseExact(timeStr, "HH:mm", CultureInfo.InvariantCulture);
            }

            throw new FormatException($"Unable to parse time: {timeStr}");
        }

        private async void ConfirmAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            // Validation is now handled by button enabled state
            try
            {
                // Prepare appointment data
                var appointmentData = new
                {
                    userId = GetCurrentUserId(), // You'll need to implement user authentication
                    doctorId = selectedDoctor.Id,
                    date = AppointmentDatePicker.SelectedDate.Value.ToString("yyyy-MM-dd"),
                    time = TimeComboBox.SelectedItem.ToString()
                };

                // Send appointment request
                var json = JsonSerializer.Serialize(appointmentData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                string token = App.Current.Properties["AuthToken"].ToString();
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                //MessageBox.Show($"JSON Sent: {json} ");

                var response = await httpClient.PostAsync("http://localhost:5000/appointments", content);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Appointment created successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    this.Close();
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Failed to create appointment: {errorResponse}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private string GetCurrentUserId()
        {
            string userId = App.Current.Properties["UserId"].ToString();
            return userId; 
        }
    }
}