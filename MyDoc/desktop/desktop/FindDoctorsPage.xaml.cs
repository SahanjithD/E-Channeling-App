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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace desktop
{
    /// <summary>
    /// Interaction logic for FindDoctorsPage.xaml
    /// </summary>
    public partial class FindDoctorsPage : Page
    {
        public FindDoctorsPage()
        {
            InitializeComponent();
        }

        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {

        }

        private void ClearPlaceholder(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (textBox != null && (textBox.Text == "Name" || textBox.Text == "Specialty"))
            {
                textBox.Text = "";
            }
        }

        private void RestorePlaceholder(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (textBox != null && string.IsNullOrWhiteSpace(textBox.Text))
            {
                if (textBox.Name == "NameTextBox")
                    textBox.Text = "Name";
                else if (textBox.Name == "SpecialtyTextBox")
                    textBox.Text = "Specialty";
            }
        }


        private void MakeAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            MakeAppointmentWindow appointmentWindow = new MakeAppointmentWindow();
            appointmentWindow.Show();


            //if (DoctorsDataGrid.SelectedItem is Doctor selectedDoctor)
            //{
            //    AppointmentWindow appointmentWindow = new AppointmentWindow(selectedDoctor);
            //    appointmentWindow.Show();
            //}
            //else
            //{
            //    MessageBox.Show("Please select a doctor before making an appointment.", "Warning", MessageBoxButton.OK, MessageBoxImage.Warning);
            //}
        }

        private void NameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }
    }
}
