import Link from 'next/link'
import React from 'react'
import styles from './BlueLinkButton.module.css'

interface BlueLinkButtonProps {
  buttonText: string;
  href: string;
}

export default function BlueLinkButton({ buttonText, href }: BlueLinkButtonProps) {
  return (
    <Link href={href} className={`${styles.blueLinkButton}`} >{buttonText}</Link>
  )
}
