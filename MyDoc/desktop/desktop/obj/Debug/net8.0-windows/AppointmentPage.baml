   M S B A M L   `   `   `  ����B  >desktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:desktopdesktop  5          desktop.AppointmentPage   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      'localclr-namespace:desktop     5        N� Title$  AppointmentPage��5	      .��5      �  � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��My Appointments��6   $��24(�6+   $
��Bold"�69   ���#0078D7$��Center=�5   )   $��10q�5      $��0��6    &   System.Windows.Controls.DataGrid  5   
   -   5          Name$ AppointmentsDataGrid��5      $��1��5         AutoGenerateColumns$ False��5      $	��250��5      $	��600��6    $��Center=�6,      SelectionMode$ Single=�5      ��5      �� *Appointments+   Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$ Doctor Name��6%      Width5  /System.Windows.Controls.DataGridLengthConverter$ * 6Y   1  +System.Windows.Controls.DataGridBoundColumn   Binding 6:   �� *
DoctorName+6Y     5       $
 Date��6%   $ * 6L    63   �� *Date+6L     5!      $
 Time��6%   $ * 6L    63   �� *Time+6L   5#      �� 5&   
   $��2��6   	 �� Orientation$	 
Horizontal=�6"   $��Center=�6;   $��10q�6X   .+�5'      �� -   5        $
��Edit��5'      $	��100��6$   $��5q�60   $��20��5(      
����������#0078D75)   *   �� 5*      -   5        $��Delete��5*      $	��100��6&   $��5q�62   $��20��5+      
����������#0078D75,   *   5-      5.      5/      