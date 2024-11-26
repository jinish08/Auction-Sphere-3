import { render, screen } from '@testing-library/react'
import Profile from '../components/Profile'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
const fields = ['Loading data...']

test.each(fields)('Rendering the profile page', (field) => {
    render(
        <Router>
            <Profile />
        </Router>
    )
    const label = screen.getByText(field)
    expect(label).toBeInTheDocument()
})
