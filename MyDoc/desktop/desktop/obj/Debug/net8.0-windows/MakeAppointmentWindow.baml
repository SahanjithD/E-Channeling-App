   M S B A M L   `   `   `  ����B  >desktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:desktopdesktop  5   	   #    desktop.MakeAppointmentWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   'localclr-namespace:desktop     5   	     � Title$  Make an Appointment��5   	   $	��450��6%   $	��400��62   .��5	      � $��20q�6    � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��Make an Appointment��6   $��20(�5      $
��Bold"�5      ���#0078D7$��Center=�5      $��0,0,0,20q�5      �� 5   
   $��1��6   .+�5      �� $��Doctor:��6   $
��Bold"�6'   �� 5      -   5         ��Name$ DoctorNameTextBox��5       �� 
IsReadOnly$
 True��5      $��0,5,0,10q�5      
�������5      �� 5       $��Available Time:��6   $
��Bold"�6/   �� 5!      -   5        $ AvailableTimeTextBox��5!      $
 True��5"      $��0,5,0,10q�5#      
�������5$      �� 5'      $��Select Date:��6   $
��Bold"�6,   (  "System.Windows.Controls.DatePicker  5(      -   5          Name$ AppointmentDatePicker��5(      $��0,5,0,10q�5)      5*      �� 5-      $��Select Time:��6   $
��Bold"�6,   �� 5.      -   5         ��Name$ TimeComboBox��5.      $��0,5,0,10q�5/      ${�False��50      51      �� 53   
   $��2��6    �� Orientation$ 
Horizontal=�6"   $��Center=�6;   .+�54      �� -   5         ��Name$ ConfirmButton��5:      $��Confirm Appointment��54      ���#0078D7
�������$	��150��57      $��0,0,10,0q�58      5:      �� 5;      -   5        $��Cancel��5;      
�������
�������$	��150��5>      5?      5@      5A      5B      