import { useTheme } from '../contexts/ThemeProvider';
import React from 'react'
import tailwind from "../tailwind.config.js"
import { Chrome } from 'lucide-react';

export default function Logo() {
  const { theme } = useTheme();

  const color = tailwind.theme.extend.backgroundColor[`color-primary-${theme}`]

  return (
    <Chrome className={`mx-auto h-10 w-auto select-none`} color={color} />
  )
}