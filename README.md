# StirItUp

StirItUp is an exciting cooking class booking platform designed for food lovers and aspiring chefs alike. Whether you want to perfect your pastries, explore the artistry of cold kitchen creations, master sizzling hot dishes, or experience the elegance of fine dining, StirItUp connects you to chefs and classes that make it possible.

With StirItUp:

 Chefs can create and manage their own cooking classes.

 Users can easily register, explore categories, book classes, and leave reviews.

 Classes start from just R500, with flexible booking days to fit into any schedule.

Our mission is simple: bring people together through food, creativity, and learning. Whether you’re a beginner or a culinary enthusiast, StirItUp helps you sharpen your skills, meet passionate chefs, and enjoy the art of cooking in a fun, interactive way.

## Quick Start

Requirements: Node 18+, MongoDB.

```bash
git clone <your-repo-url>
cd StirItUp
cp .env.example .env
npm install
npm run dev
```

API endpoints (base `/api`):

- `POST /register` - register
- `POST /login` - login
- `GET /users/me` - get profile (auth)
- `PUT /users/me` - update profile (auth)
- `GET /classes` - list classes
- `GET /classes/:id` - class details
- `POST /classes` - create class (chef only)
- `PUT /classes/:id` - update class (chef only)
- `DELETE /classes/:id` - delete class (chef only)
- `POST /bookings` - book a class (auth)
- `GET /bookings` - list my bookings (auth)
- `DELETE /bookings/:id` - cancel booking (auth)
- `POST /reviews` - submit review (auth)
- `GET /reviews` - list reviews
- `GET /reviews/class/:id` - reviews for class

Demo: open `http://localhost:5000` after starting.

Loom script (2-4 minutes):
1. Intro (10s) - name, project title
2. Register & login (20s)
3. Create class as chef (30s)
4. Book class as user (30s)
5. Leave review & show bookings (30s)
6. Wrap up (10s)

