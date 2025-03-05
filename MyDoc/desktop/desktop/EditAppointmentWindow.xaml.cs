using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;

namespace desktop
{
    public partial class EditAppointmentWindow : Window
    {
        private readonly Appointment _appointment;
        private static readonly HttpClient httpClient = new HttpClient();

        public EditAppointmentWindow(Appointment appointment)
        {
            InitializeComponent();
            _appointment = appointment;

            DoctorNameTextBox.Text = _appointment.DoctorName;
            AppoinmentDatePicker.Text = _appointment.Date;
            TimeComboBox.Text = _appointment.Time;
        }
        

        private async void SaveChanges(object sender, RoutedEventArgs e)
        {
            // Get updated values
            string updatedDate = AppoinmentDatePicker.Text;
            string updatedTime = TimeComboBox.Text;

            // Convert time to 24-hour format
            if (DateTime.TryParse(updatedTime, out DateTime parsedTime))
            {
                updatedTime = parsedTime.ToString("HH:mm"); // Convert to "HH:mm"
            }
            else
            {
                MessageBox.Show("Invalid time format.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var updatedAppointment = new
            {
                date = updatedDate,
                time = updatedTime
            };

            try
            {
                // Convert to JSON
                string jsonContent = JsonSerializer.Serialize(updatedAppointment);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                string token = App.Current.Properties["AuthToken"].ToString();
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                // Send PUT request to update appointment
                MessageBox.Show($"JSON Sent: {jsonContent} Appoinment ID {_appointment.Id}");

                string apiUrl = $"http://localhost:5000/appointments/{_appointment.Id}";
                HttpResponseMessage response = await httpClient.PutAsync(apiUrl, content);

                MessageBox.Show($"Response: {response}");

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Appointment updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    Close();
                }
                else
                {
                    MessageBox.Show("Failed to update appointment.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Exception", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CloseWindow(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
