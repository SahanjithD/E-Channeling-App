   M S B A M L   `   `   `  ����B  >desktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:desktopdesktop  5   	   #    desktop.EditAppointmentWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   'localclr-namespace:desktop     5   	     � Title$  EditAppointmentWindow��5   	   $	��350��6'   $	��400��64   .��5	      � $��20q�6    � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��Edit Appointment��6   $��18(�6,   ���#0078D7$
��Bold"�5   )   $��Center=�5      $��0��61   $��0,0,0,10q�5      �� 5   
   $��1��6   .+�5      �� $��Doctor Name��6   �� 5      -   5         ��Name$ DoctorNameTextBox��5       �� 
IsReadOnly$
 True��5      �� 5      $
��Date��6   (  "System.Windows.Controls.DatePicker  5      -   5          Name$ AppoinmentDatePicker��5      �� 5      $
��Time��6   �� 5      -   5         ��Name$ TimeComboBox��5      .@�5       �� $��09:00 AM��6   �� 5!      $��10:00 AM��6   �� 5"      $��11:00 AM��6   �� 5#      $��02:00 PM��6   �� 5$      $��03:00 PM��6   �� 5%      $��04:00 PM��6   5&      5'      �� 5)   
   $��2��6    �� Orientation$ 
Horizontal=�6"   $��Center=�6;   $��10q�6X   .+�5*      �� -   5        $
��Save��5*      $��80��6$   $��5q�6/   ���#0078D7
�������5,      �� 5-      -   5        $��Cancel��5-      $��80��6&   $��5q�61   6<   5.      5/      50      