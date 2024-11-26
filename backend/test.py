import pytest
from app import app
from datetime import datetime, timedelta
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# User Authentication Tests
def test_signup_success(client):
    data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@test.com",
        "contact": "1234567890",
        "password": "test123"
    }
    response = client.post('/signup', json=data)
    assert response.status_code == 200
    assert response.json['message'] == "Added successfully"

def test_signup_duplicate_email(client):
    data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@test.com",
        "contact": "1234567891",
        "password": "test123"
    }
    response = client.post('/signup', json=data)
    assert response.json['message'] == "An account with this email already exists"

def test_login_success(client):
    data = {
        "email": "john@test.com",
        "password": "test123"
    }
    response = client.post('/login', json=data)
    assert response.json['message'] == "Logged in successfully"

def test_login_invalid_credentials(client):
    data = {
        "email": "john@test.com",
        "password": "wrongpass"
    }
    response = client.post('/login', json=data)
    assert response.json['message'] == "Invalid credentials!"

# Product Management Tests
def test_create_product(client):
    data = {
        "productName": "Test Product",
        "sellerEmail": "john@test.com",
        "initialPrice": 100,
        "buyNowPrice": 150,
        "increment": 10,
        "photo": "base64string",
        "description": "Test description",
        "biddingTime": 7,
        "category": "Electronics"
    }
    response = client.post('/product/create', json=data)
    assert response.json['result'] == "Added product successfully"

def test_get_all_products(client):
    response = client.get('/product/listAll')
    assert response.status_code == 200
    assert 'result' in response.json

def test_get_product_details(client):
    data = {"productID": 1}
    response = client.post('/product/getDetails', json=data)
    assert response.status_code == 200
    assert 'product' in response.json
    assert 'bids' in response.json

def test_update_product(client):
    data = {
        "productID": 1,
        "productName": "Updated Product",
        "initialPrice": 120,
        "buyNowPrice": 170,
        "deadlineDate": (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d %H:%M:%S'),
        "description": "Updated description",
        "increment": 15,
        "category": "Electronics"
    }
    response = client.post('/product/update', json=data)
    assert response.json['message'] == "Updated product successfully"

# Bidding Tests
def test_create_bid(client):
    data = {
        "prodId": 1,
        "email": "bidder@test.com",
        "bidAmount": 110
    }
    response = client.post('/bid/create', json=data)
    assert response.status_code == 200
    assert 'message' in response.json

def test_create_bid_below_initial_price(client):
    data = {
        "prodId": 1,
        "email": "bidder@test.com",
        "bidAmount": 50
    }
    response = client.post('/bid/create', json=data)
    assert response.json['message'] == "Amount less than initial price"

def test_auto_bid_creation(client):
    data = {
        "prodId": 1,
        "email": "bidder@test.com",
        "initialBid": 120,
        "maxBidAmount": 200
    }
    response = client.post('/bid/auto', json=data)
    assert response.status_code == 200
    assert 'message' in response.json

def test_buy_now_purchase(client):
    data = {
        "prodId": 1,
        "email": "buyer@test.com"
    }
    response = client.post('/product/buy-now', json=data)
    assert response.status_code == 200
    assert 'message' in response.json

# Profile Tests
def test_profile_without_login(client):
    response = client.post('/profile')
    assert response.status_code == 200

def test_profile_with_login(client):
    # First login
    client.post('/login', json={"email": "john@test.com", "password": "test123"})
    response = client.post('/profile')
    assert 'email' in response.json
    assert 'products' in response.json

# Latest Products Tests
def test_get_latest_products(client):
    response = client.get('/getLatestProducts')
    assert response.status_code == 200
    assert 'products' in response.json
    assert 'maximumBids' in response.json

def test_get_top_ten_products(client):
    response = client.get('/getTopTenProducts')
    assert response.status_code == 200
    assert 'products' in response.json

# Edge Cases
def test_invalid_product_id(client):
    data = {"productID": 9999}
    response = client.post('/product/getDetails', json=data)
    assert response.status_code == 200
    assert response.json['product'] == []

def test_auto_bid_validation(client):
    data = {
        "prodId": 1,
        "email": "bidder@test.com",
        "initialBid": 200,
        "maxBidAmount": 150
    }
    response = client.post('/bid/auto', json=data)
    assert response.json['message'] == "Maximum amount must be greater than initial bid"

def test_buy_own_product(client):
    data = {
        "prodId": 1,
        "email": "john@test.com"  # Same as seller email
    }
    response = client.post('/product/buy-now', json=data)
    assert response.json['message'] == "Product not found"