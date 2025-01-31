﻿using System;
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
using System.Windows.Navigation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace desktop
{
    /// <summary>
    /// Interaction logic for AuthWindow.xaml
    /// </summary>
    public partial class AuthWindow : Window
    {
        public AuthWindow()
        {
            InitializeComponent();
            AuthFrame.Content = new LoginPage();
        }

        private void BackToLogin_Click(object sender, RoutedEventArgs e)
        {
            AuthFrame.Content = new LoginPage();
        }

        private void GoToSignUp_Click(object sender, RoutedEventArgs e)
        {
            AuthFrame.Content = new SignInPage();
        }
    }
}
