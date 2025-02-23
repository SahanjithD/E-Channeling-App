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
using System.Net.Http;
using System.Text.Json;

namespace desktop
{
    /// <summary>
    /// Interaction logic for SignInPage.xaml
    /// </summary>
    public partial class SignInPage : Page
    {
        private readonly HttpClient _httpClient;
        private const string API_BASE_URL = "http://localhost:5000";
        public SignInPage()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
        }

        private void BackToLogin_Click(object sender, RoutedEventArgs e)
        {
            if (Window.GetWindow(this) is AuthWindow authWindow)
            {
                authWindow.AuthFrame.Content = new LoginPage();
            }
        }
        private async void SignInButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                // Assuming you have TextBox controls with these names
                string name = NameTextBox.Text;
                string email = EmailTextBox.Text;
                string password = PasswordTextBox.Password;
                string phoneNumber = PhoneTextBox.Text;
                string gender = GenderComboBox.SelectedItem?.ToString();

                // Parse age from TextBox
                if (!int.TryParse(AgeTextBox.Text, out int age))
                {
                    MessageBox.Show("Please enter a valid age.", "Validation Error");
                    return;
                }

                // Basic validation
                if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) ||
                    string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(gender) ||
                    string.IsNullOrWhiteSpace(phoneNumber))
                {
                    MessageBox.Show("Please fill in all fields.", "Validation Error");
                    return;
                }

                // Create registration data
                var registrationData = new
                {
                    name = name,
                    age = age,
                    email = email,
                    password = password,
                    gender = gender,
                    phoneNumber = phoneNumber
                };

                // Serialize the registration data
                string jsonContent = JsonSerializer.Serialize(registrationData);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Make the API request to register endpoint
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/users/register", content);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Registration successful! Please login.", "Success");

                    // Navigate back to login page
                    if (Window.GetWindow(this) is AuthWindow authWindow)
                    {
                        authWindow.AuthFrame.Content = new LoginPage();
                    }
                }

                else
                {
                    var errorResponse = JsonSerializer.Deserialize<ErrorResponse>(responseContent);
                    MessageBox.Show(errorResponse.Message ?? "Registration failed. Please try again.", "Registration Error");
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error");
            }

        }
    }
}
