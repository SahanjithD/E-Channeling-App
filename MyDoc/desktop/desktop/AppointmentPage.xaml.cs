using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;

namespace desktop
{
    public partial class AppointmentPage : Page
    {
        public ObservableCollection<Appointment> Appointments { get; set; }

        public AppointmentPage()
        {
            InitializeComponent();

            Appointments = new ObservableCollection<Appointment>
            {
                new Appointment { DoctorName = "Dr. John Doe", Specialty = "Cardiology", Date = "March 5, 2025", Time = "10:00 AM" },
                new Appointment { DoctorName = "Dr. Sarah Smith", Specialty = "Dermatology", Date = "March 6, 2025", Time = "2:00 PM" },
                new Appointment { DoctorName = "Dr. Emily Brown", Specialty = "Neurology", Date = "March 7, 2025", Time = "4:30 PM" }
            };

            DataContext = this; // Set data context for binding
        }

        // Delete selected appointment
        private void DeleteAppointment(object sender, RoutedEventArgs e)
        {
            if (AppointmentsDataGrid.SelectedItem is Appointment selectedAppointment)
            {
                MessageBoxResult result = MessageBox.Show("Are you sure you want to delete this appointment?", "Confirm Delete", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                if (result == MessageBoxResult.Yes)
                {
                    Appointments.Remove(selectedAppointment);
                }
            }
            else
            {
                MessageBox.Show("Please select an appointment to delete.", "No Selection", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        // Edit selected appointment
        private void EditAppointment(object sender, RoutedEventArgs e)
        {
            if (AppointmentsDataGrid.SelectedItem is Appointment selectedAppointment)
            {
                EditAppointmentWindow editWindow = new EditAppointmentWindow(selectedAppointment);
                editWindow.ShowDialog();
                AppointmentsDataGrid.Items.Refresh(); // Refresh the DataGrid
            }
            else
            {
                MessageBox.Show("Please select an appointment to edit.", "No Selection", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }

    public class Appointment
    {
        public string DoctorName { get; set; }
        public string Specialty { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}
