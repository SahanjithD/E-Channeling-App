   M S B A M L   `   `   `  ����B  >desktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:desktopdesktop  5          desktop.FindDoctorsPage   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      'localclr-namespace:desktop     5        N� Title$  FindDoctorsPage��5	      .��5      � $��20q�6    � RowDefinitions 5   
   �� 5      $
��auto �6   �� 5      $
��auto �6   �� 5      $��* �6   �� 5      $
��auto �6   .+�5   
   �� $��Find Doctors��6   $��0��6)   $��24(�5      $
��Bold"�5      ���#0078D7$��Center=�5      $��0,0,0,20q�6)   �� 5   
    �� Orientation$ 
Horizontal=�6   $��Center=�5      $��0,0,0,20q�5      $��1��5      .+�5      �� -   5         ��Name$ NameTextBox��5      $	��250��6+   $��30��67   $��2q�6C   �� 5      -   5        $ SpecialtyTextBox��5      $	��250��60   $��30��6<   $��2q�6H   �� 5      -   5        $��Search��5      $	��100��6&   $��30��62   ���#0078D7
�������$��10,0,0,0q�5        62   5!      &   System.Windows.Controls.DataGrid  5$   
   -   5          Name$ DoctorsDataGrid��5$      $��2��5%         AutoGenerateColumns$
 True��5&      $	��250��5'      $	��600��6   $��Center=�6$      SelectionMode$ Single=�5(         Columns 5)      0  *System.Windows.Controls.DataGridTextColumn  5*      ,  &System.Windows.Controls.DataGridColumn   Header$ Doctor Name��6%   	   Width5  /System.Windows.Controls.DataGridLengthConverter$	 * 6S   1  +System.Windows.Controls.DataGridBoundColumn
   Binding
 6:   �� *Name+6S     5+      $ 	Specialty��6%   $	 * 6V   
 68   �� *	Specialty+6V   5-      �� 50   
   -   5        $��Make Appointment��50      $��3��51      $	��200��52      $��40��6   ���#0078D7
�������$��0,20,0,0q�53      $��Center=�6.   54   	   55      56      