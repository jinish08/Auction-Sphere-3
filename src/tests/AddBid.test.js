import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { toast } from 'react-toastify'
import AddBid from '../components/AddBid'

// Mock axios and react-toastify
jest.mock('axios')
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}
global.localStorage = localStorageMock

describe('AddBid Component', () => {
    const mockProps = {
        productId: '123',
        sellerEmail: 'seller@test.com'
    }

    // Before all tests, set up localStorage mock
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn()
            },
            writable: true
        });
    });

    // Before each test, clear mock state
    beforeEach(() => {
        window.localStorage.getItem.mockClear();
        window.localStorage.setItem.mockClear();
        window.localStorage.clear.mockClear();
    });

    test('renders AddBid component correctly', () => {
        render(<AddBid {...mockProps} />)

        expect(screen.getByText('Place a Bid')).toBeInTheDocument()
        expect(screen.getByText('Enable Auto-bidding')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your bid amount')).toBeInTheDocument()
    })

    test('toggles auto-bid form fields', () => {
        render(<AddBid {...mockProps} />)

        const toggleSwitch = screen.getByRole('checkbox')
        expect(screen.queryByText('Maximum Bid Amount:')).not.toBeInTheDocument()

        fireEvent.click(toggleSwitch)
        expect(screen.getByText('Maximum Bid Amount:')).toBeInTheDocument()

        fireEvent.click(toggleSwitch)
        expect(screen.queryByText('Maximum Bid Amount:')).not.toBeInTheDocument()
    })

    test('handles regular bid submission', async () => {
        // Set up localStorage mock before rendering
        window.localStorage.getItem.mockReturnValue('buyer@test.com')
        
        axios.post.mockResolvedValueOnce({ data: { message: 'Bid placed successfully' } })
        render(<AddBid {...mockProps} />)
        
        const bidInput = screen.getByPlaceholderText('Enter your bid amount')
        const submitButton = screen.getByRole('button')
        
        fireEvent.change(bidInput, { target: { value: '100' } })
        fireEvent.click(submitButton)
        
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/bid/create'),
                {
                    bidAmount: '100',
                    prodId: '123',
                    email: 'buyer@test.com'
                }
            )
            expect(toast.success).toHaveBeenCalledWith('Bid placed successfully')
        })
    })

    test('handles auto-bid submission', async () => {
        // Set up localStorage mock before the test
        window.localStorage.getItem.mockReturnValue('buyer@test.com')

        axios.post.mockResolvedValueOnce({ data: { message: 'Auto-bid set successfully' } })
        render(<AddBid {...mockProps} />)

        // Toggle auto-bid
        const toggleSwitch = screen.getByRole('checkbox')
        fireEvent.click(toggleSwitch)

        // Fill in the form
        const initialBidInput = screen.getByPlaceholderText('Enter your bid amount')
        const maxBidInput = screen.getByPlaceholderText('Enter your maximum bid')
        const submitButton = screen.getByText('Set Auto-bid')

        fireEvent.change(initialBidInput, { target: { value: '100' } })
        fireEvent.change(maxBidInput, { target: { value: '200' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/bid/auto'),
                {
                    prodId: '123',
                    email: 'buyer@test.com',
                    initialBid: '100',
                    maxBidAmount: '200'
                }
            )
            expect(toast.success).toHaveBeenCalled()
        })
    })

    test('prevents bidding on own product', async () => {
        localStorage.getItem.mockReturnValueOnce('seller@test.com')
        render(<AddBid {...mockProps} />)

        const bidInput = screen.getByPlaceholderText('Enter your bid amount')
        const submitButton = screen.getByRole('button')

        fireEvent.change(bidInput, { target: { value: '100' } })
        fireEvent.click(submitButton)

        expect(toast.error).toHaveBeenCalledWith('Cannot bid on your own product!')
    })

    test('validates auto-bid maximum amount', async () => {
        render(<AddBid {...mockProps} />)

        const toggleSwitch = screen.getByRole('checkbox')
        fireEvent.click(toggleSwitch)

        const initialBidInput = screen.getByPlaceholderText('Enter your bid amount')
        const maxBidInput = screen.getByPlaceholderText('Enter your maximum bid')
        const submitButton = screen.getByRole('button')

        fireEvent.change(initialBidInput, { target: { value: '200' } })
        fireEvent.change(maxBidInput, { target: { value: '100' } })
        fireEvent.click(submitButton)

        expect(toast.error).toHaveBeenCalledWith('Maximum amount must be greater than initial bid amount')
    })

    test('handles bid submission error', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network error'))
        render(<AddBid {...mockProps} />)

        const bidInput = screen.getByPlaceholderText('Enter your bid amount')
        const submitButton = screen.getByRole('button')

        fireEvent.change(bidInput, { target: { value: '100' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error placing bid')
        })
    })
})