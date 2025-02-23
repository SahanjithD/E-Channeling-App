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
    /// <summary>
    /// Interaction logic for MakeAppointmentWindow.xaml
    /// </summary>
    public partial class MakeAppointmentWindow : Window
    {
        public MakeAppointmentWindow()
        {
            InitializeComponent();
        }

        private void ConfirmAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
        private void CancelAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
