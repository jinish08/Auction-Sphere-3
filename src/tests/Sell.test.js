import { render, screen } from '@testing-library/react'
import Sell from '../components/Sell'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

test('Renders sell product form', () => {
    render(
        <Router>
            <Sell />
        </Router>
    )

    const productNameLabel = screen.getByText('Product Name')
    expect(productNameLabel).toBeInTheDocument()

    const initialPriceLabel = screen.getByText('Minimum Price')
    expect(initialPriceLabel).toBeInTheDocument()
})
