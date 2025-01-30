import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import './App.css'
import userData from './data/user.json'

interface User {
  name: string;
  age: number;
  race: string;
  gender: string;
}

export interface UserData {
  user: User;
}

function App() {
  const [isApproved, setIsApproved] = useState(false)

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    
    const { name, age, race, gender } = userData.user
    page.drawText(`Name: ${name}`, { x: 50, y: page.getHeight() - 50 })
    page.drawText(`Age: ${age}`, { x: 50, y: page.getHeight() - 70 })
    page.drawText(`Race: ${race}`, { x: 50, y: page.getHeight() - 90 })
    page.drawText(`Gender: ${gender}`, { x: 50, y: page.getHeight() - 110 })
    page.drawText('APPROVED', { x: 50, y: page.getHeight() - 150 })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'user-document.pdf'
    link.click()
  }

  return (
    <button onClick={async () => {
      setIsApproved(true)
      await generatePDF()
    }}>
      {isApproved ? 'Approved!' : 'Approve'}
    </button>
  )
}

export default App