cd &&

#Install basic programs
sudo apt-get install git vim code gparted postman vlc thonny neofetch -y

#Copy dotfiles to $HOME directory
cd Github/dotfiles
cp .bashrc .gitconfig .vimrc .vscode .material-theme-profile.dconf ../../.

#Setup terminal theme
dconf load /org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ < material-theme-profile.dconf

#Setup neofetch
cp .config.conf ../../.config/neofetch

#Update everything if needed
sudo apt-get update && sudo apt-get upgrade -y && sudo apt autoremove -y

echo Installation is completed.  
