import { Component } from 'vue';

export interface AdminView {
  id: String; // Used to reference the buttons in SideBar
  title: String;
  icon: String;
  component: Component;
}
