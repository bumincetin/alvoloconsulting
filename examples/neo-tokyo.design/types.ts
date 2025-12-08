import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  category: string;
  image: string;
}

export interface Stat {
  value: string;
  label: string;
}