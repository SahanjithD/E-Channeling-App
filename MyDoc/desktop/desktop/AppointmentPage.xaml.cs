using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace desktop
{
    public partial class AppointmentPage : Page
    {
        private readonly HttpClient _httpClient = new HttpClient();
        public ObservableCollection<Appointment> Appointments { get; set; }

        public AppointmentPage()
        {
            InitializeComponent();
            Appointments = new ObservableCollection<Appointment>();
            DataContext = this;
            LoadAppointments();
        }

        // Fetch appointments from the API
        private async void LoadAppointments()
        {
            try
            {
                if (!App.Current.Properties.Contains("AuthToken") || !App.Current.Properties.Contains("UserId"))
                {
                    MessageBox.Show("Authentication required. Please log in again.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string token = App.Current.Properties["AuthToken"].ToString();
                string userId = App.Current.Properties["UserId"].ToString();

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await _httpClient.GetAsync($"http://localhost:5000/appointments/{userId}");

                if (!response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Failed to fetch appointments.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string json = await response.Content.ReadAsStringAsync();
                var appointments = JsonSerializer.Deserialize<ObservableCollection<Appointment>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                Appointments.Clear();
                foreach (var appointment in appointments)
                {
                    Appointments.Add(appointment);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading appointments: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Delete selected appointment
        private async void DeleteAppointment(object sender, RoutedEventArgs e)
        {
            if (AppointmentsDataGrid.SelectedItem is Appointment selectedAppointment)
            {
                MessageBoxResult result = MessageBox.Show("Are you sure you want to delete this appointment?", "Confirm Delete", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        string token = App.Current.Properties["AuthToken"].ToString();
                        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                        HttpResponseMessage response = await _httpClient.DeleteAsync($"http://localhost:5000/appointments/{selectedAppointment.Id}");

                        if (response.IsSuccessStatusCode)
                        {
                            Appointments.Remove(selectedAppointment);
                        }
                        else
                        {
                            MessageBox.Show("Failed to delete appointment.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error deleting appointment: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            else
            {
                MessageBox.Show("Please select an appointment to delete.", "No Selection", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        // Edit selected appointment
        private async void EditAppointment(object sender, RoutedEventArgs e)
        {
            if (AppointmentsDataGrid.SelectedItem is Appointment selectedAppointment)
            {
                EditAppointmentWindow editWindow = new EditAppointmentWindow(selectedAppointment);
                if (editWindow.ShowDialog() == true) // If the user confirmed the edit
                {
                    try
                    {
                        string token = App.Current.Properties["AuthToken"].ToString();
                        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                        string jsonContent = JsonSerializer.Serialize(selectedAppointment);
                        HttpContent content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                        HttpResponseMessage response = await _httpClient.PutAsync($"http://localhost:5000/appointments/{selectedAppointment.Id}", content);

                        if (!response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Failed to update appointment.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                        else
                        {
                            AppointmentsDataGrid.Items.Refresh();
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error updating appointment: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            else
            {
                MessageBox.Show("Please select an appointment to edit.", "No Selection", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }

    public class Appointment
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Status { get; set; }

        // Ensure the doctor details are correctly mapped
        public Doctor Doctor { get; set; }

        // Read-only properties to display in the UI
        public string DoctorName => Doctor?.Name ?? "Unknown";
        public string Specialty => Doctor?.Specialty ?? "Unknown";
    }

    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specialty { get; set; }
        public string AvailableTime { get; set; }
    }

}
