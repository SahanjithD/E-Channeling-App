   M S B A M L   `   `   `  ����B  >desktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:desktopdesktop  5   	       desktop.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   'localclr-namespace:desktop     5   	     � Title$  
MainWindow��5   	   $	��450��6   $	��800��6)   .��5
      �  � RowDefinitions 5   
   �� 5      $��50 �6   �� 5      $��* �6   .+�5   
   ]� ���#0078D7$��0��6)   .+�5      ��  �� Orientation$ 
Horizontal=�6   $
��Left=�62   .+�5      �� -   5        $
��Home��5      $
��15,5q�6(   $
��10,0q�67   
������ 
�������$��0q�5   ,   6@   �� 5      -   5        $��Appointments��5      $
��15,5q�60   $
��10,0q�6?   
������ 
�������$��0q�5      6-   �� 5      -   5        $��Find Doctors��5      $
��15,5q�60   $
��10,0q�6?   
������ 
�������$��0q�5   E   5      �� 5      -   5        $��About��5      $
��15,5q�6)   $
��10,0q�68   
������ 
�������$��0q�5   ,   6@   5       �� 5!      -   5        $��Logout��5!      $
��15,5q�6&   $
��10,0q�65   $��Right=�6C   
������ 
�������$��0q�5"   A   5#      5%       � 5'   
   -   5          �Name$ 	MainFrame��5'      $��1��6#     � NavigationUIVisibility$ Hidden=�60   5(      5)      