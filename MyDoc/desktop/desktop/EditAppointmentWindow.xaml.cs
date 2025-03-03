using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace desktop
{
    public partial class EditAppointmentWindow : Window
    {
        private Appointment _appointment;
        public EditAppointmentWindow(Appointment appointment)
        {
            InitializeComponent();
            _appointment = appointment;

 
            DoctorNameTextBox.Text = _appointment.DoctorName;
            AppoinmentDatePicker.Text = _appointment.Date;
            TimeComboBox.Text = _appointment.Time;
        }

        private void SaveChanges(object sender, RoutedEventArgs e)
        {

        }

        private void CloseWindow(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
