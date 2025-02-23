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
    /// Interaction logic for LoginPage.xaml
    /// </summary>
    public partial class LoginPage : Page
    {
        private readonly HttpClient _httpClient;
        private const string API_BASE_URL = "http://localhost:5000"; // API URL
        public LoginPage()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
        }

        private void GoToSignUp_Click(object sender, RoutedEventArgs e)
        {
            if (Window.GetWindow(this) is AuthWindow authWindow)
            {
                authWindow.AuthFrame.Content = new SignInPage();
            }
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string email = UsernameTextBox.Text;
                string password = PasswordTextBox.Password;

                if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                {
                    MessageBox.Show("Please enter both email and password.", "Validation Error");
                    return;
                }

                // Create login request data
                var loginData = new
                {
                    email = email,
                    password = password
                };

                // Serialize the login data
                string jsonContent = JsonSerializer.Serialize(loginData);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Make the API request
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/users/login", content);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the response
                    var loginResponse = JsonSerializer.Deserialize<LoginResponse>(responseContent);

                    // Store the token (you might want to use a more secure storage method)
                    App.Current.Properties["AuthToken"] = loginResponse.Token;
                    App.Current.Properties["UserId"] = loginResponse.Id;

                    // Navigate to main window
                    if (Window.GetWindow(this) is AuthWindow authWindow)
                    {
                        MainWindow mainWindow = new();
                        mainWindow.Show();
                        authWindow.Close();
                    }
                }
                else
                {
                    var errorResponse = JsonSerializer.Deserialize<ErrorResponse>(responseContent);
                    MessageBox.Show(errorResponse.Message ?? "Login failed. Please try again.", "Login Error");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error");
            }
            //if (Window.GetWindow(this) is AuthWindow authWindow)
            //{
            //    {
            //        MainWindow mainWindow = new();
            //        mainWindow.Show();
            //        authWindow.Close();
            //    }
            //}
        }
    }
}

// Response models
public class LoginResponse
{
    public string Token { get; set; }
    public string Id { get; set; }
}

public class ErrorResponse
{
    public string Message { get; set; }
}

