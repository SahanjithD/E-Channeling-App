using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace desktop
{
    public partial class FindDoctorsPage : Page
    {
        private readonly HttpClient httpClient = new HttpClient();
        private readonly string[] Specializations = new[]
        {
            "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist",
            "Orthopedic", "General Surgeon", "Obstetrician/Gynecologist",
            "Ophthalmologist", "Otolaryngologist", "Psychiatrist", "Urologist",
            "Gastroenterologist", "Endocrinologist", "Nephrologist",
            "Pulmonologist", "Rheumatologist", "Oncologist",
            "Allergist/Immunologist", "Infectious Disease Specialist", "Hematologist"
        };

        public FindDoctorsPage()
        {
            InitializeComponent();
            PopulateSpecializations();
            ConfigureDataGrid();
        }

        private void ConfigureDataGrid()
        {
            // Disable auto-generation of columns
            DoctorsDataGrid.AutoGenerateColumns = false;

            // Clear any existing columns
            DoctorsDataGrid.Columns.Clear();

            // Add specifically the columns we want
            DoctorsDataGrid.Columns.Add(new DataGridTextColumn
            {
                Header = "Doctor Name",
                Binding = new System.Windows.Data.Binding("Name"),
                Width = new DataGridLength(1, DataGridLengthUnitType.Star)
            });

            DoctorsDataGrid.Columns.Add(new DataGridTextColumn
            {
                Header = "Specialty",
                Binding = new System.Windows.Data.Binding("Specialty"),
                Width = new DataGridLength(1, DataGridLengthUnitType.Star)
            });

            DoctorsDataGrid.Columns.Add(new DataGridTextColumn
            {
                Header = "Available Time",
                Binding = new System.Windows.Data.Binding("AvailableTime"),
                Width = new DataGridLength(1, DataGridLengthUnitType.Star)
            });
        }

        private void PopulateSpecializations()
        {
            SpecialtyComboBox.Items.Clear();
            SpecialtyComboBox.Items.Add(new ComboBoxItem { Content = "Select Specialization" });

            foreach (var specialization in Specializations)
            {
                SpecialtyComboBox.Items.Add(new ComboBoxItem { Content = specialization });
            }

            SpecialtyComboBox.SelectedIndex = 0;
        }

        private void ClearPlaceholder(object sender, RoutedEventArgs e)
        {
            TextBox? textBox = sender as TextBox;
            if (textBox != null && textBox.Text == "Doctor Name")
            {
                textBox.Text = "";
            }
        }

        private void RestorePlaceholder(object sender, RoutedEventArgs e)
        {
            TextBox? textBox = sender as TextBox;
            if (textBox != null && string.IsNullOrWhiteSpace(textBox.Text))
            {
                textBox.Text = "Doctor Name";
            }
        }

        private async void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            string name = NameTextBox.Text.Trim() == "Doctor Name" ? "" : NameTextBox.Text.Trim();
            string? specialty = SpecialtyComboBox.SelectedItem is ComboBoxItem selectedItem &&
                               selectedItem.Content.ToString() != "Select Specialization"
                               ? selectedItem.Content.ToString()
                               : "";

            try
            {
                var queryParams = new List<string>();
                if (!string.IsNullOrEmpty(name))
                    queryParams.Add($"name={Uri.EscapeDataString(name)}");
                if (!string.IsNullOrEmpty(specialty))
                    queryParams.Add($"specialty={Uri.EscapeDataString(specialty)}");

                string queryString = queryParams.Count > 0 ? "?" + string.Join("&", queryParams) : "";

                HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:5000/doctors/search{queryString}");

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    List<Doctor>? doctors = JsonSerializer.Deserialize<List<Doctor>>(jsonResponse,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    DoctorsDataGrid.ItemsSource = doctors;
                }
                else
                {
                    MessageBox.Show("Failed to fetch doctors.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error fetching doctors: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void MakeAppointmentButton_Click(object sender, RoutedEventArgs e)
        {
            if (DoctorsDataGrid.SelectedItem is Doctor selectedDoctor)
            {
                MakeAppointmentWindow appointmentWindow = new MakeAppointmentWindow(selectedDoctor);
                appointmentWindow.Owner = this.Parent as Window; // Set owner for modal behavior
                appointmentWindow.ShowDialog(); // Use ShowDialog to make it modal
            }
            else
            {
                MessageBox.Show("Please select a doctor before making an appointment.", "Warning", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
    }
}