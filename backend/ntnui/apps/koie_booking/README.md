# Koie reservation system

## Description

Application for booking koier.

## Prerequisites and installment

See https://github.com/elinego/membership-system/backend/README.md

## Structure

+---models
| booking.py
| booking_payment.py
| description.py
| koie.py
| location.py
| **init**.py  
|  
|  
+---serializers
| all_koier.py
| booking.py
| koie.py
| **init**.py
|  
|  
+---templates
| booking_confirmation.html
| booking_confirmation.txt
| koie_information.html
| koie_information.txt
|  
+---views
booking.py
koie.py
**init**.py

## Using the system

The endpoints for retrieving information from get-requests are:

```
/koie/koie                                # Returns a list of all koier, with info about Name and number of beds
/koie/koie/{slug}                         # Returns all information about one koie. The koie slug is lowercase(KoieName)
/koie/booking                             # Returns a list of all bookings and the booking information
/koie/booking/{booking_id}                # Returns booking information about one booking
```

Currently all get-requests are available without being authenticated.

There is only one available post-request, this is at:

```
/koie/booking                             # Posts a new booking reservation
```

To make the POST-request one must be logged in, and the datafields sent with the requests are:

```python
"koie": "koieslug",
"arrival_date": "YYYY-MM-DD",
"departure_date":"YYYY-MM-DD",
"contact_email": "contact@gmail.com"
"guests_member":int,
"guests_not_member":int
```

The total number of guests can not exceed maximum beds available at the date on koie, and the dates can not be outside the acceptable booking-window. The default number of days is 14.

When POST-request is valid, it will create three chained objects: booking, booking_payment and transaction.

To finish the payment, the transaction has to be made. This happens from a post-request to

```
/payments/stripetransaction{id}         #Updates transaction and makes payment
```

To do this the id = stripe_transaction_id recieved from booking when booking is posted.
The data sent with the request is a token created with payment info from stripe.
To work the Group "Koiegruppa" has to have a valid payment_key. In developing and production this has to be added manually each time the server is re-launched.

## Development and Swagger

In the developing process the system is run locally with docker.
Swagger is used to execute requests and test that everything is working.
Using swagger also allows for authentication and changing of databade-objects through the admin-panel.

## Testing

For testing the backend code, the pytest test framework is used.

There are several types of tests, and to test the classes in the models it is made use of fixtures and factories. This is to create mock objects that does not affect the database, but acts like it does.
From this follows that the factories also have to be tested.

When testing work tests has been made for the models, the serializers and the views.

To run the tests use

```python
make pytest
```

## Built with

- [Docker](https://docs.docker.com/) - Container
- [Make](https://www.gnu.org/software/make/manual/make.html) - Development tool
- [DjangoREST](https://docs.djangoproject.com/en/3.0/) - Web-framework
- [Pytest](https://docs.pytest.org/en/latest/contents.html) - Test-framework
