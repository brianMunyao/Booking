import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "SECRET_KEY"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ticket_booking.db"
db = SQLAlchemy(app)
admin = Admin(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String, nullable=False)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class Matches(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    home = db.Column(db.String, nullable=False)
    away = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    seats = db.Column(db.Integer, default=60000)
    type_match = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now())


admin.add_view(ModelView(Matches, db.session))


class MatchSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Matches


class Tickets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, nullable=False)
    matchid = db.Column(db.Integer, nullable=False)
    ticket_bought = db.Column(db.Boolean, nullable=False)


class TicketsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tickets


admin.add_view(ModelView(Tickets, db.session))


@app.route("/api/users/login", methods=["POST"])
def login():
    user_exists = (
        db.session.query(User.id)
        .filter_by(email=request.json["email"], password=request.json["password"])
        .first()
        is not None
    )
    print(request.get_json())
    if not user_exists:
        logged_user = User.query.with_entities(
            User.id, User.email, User.username, User.phone_number
        ).filter_by(email=request.json["email"])
        user_schema = UserSchema(many=True)
        output = user_schema.dump(logged_user)
        return {"data": output}
    else:
        return {"error": "Invalid username or password"}


@app.route("/api/users/signup", methods=["POST"])
def postUsers():
    user_exists = (
        db.session.query(User.id).filter_by(
            email=request.json["email"]).first()
        is not None
    )
    print(user_exists)
    if not user_exists:
        user = User(
            email=request.json["email"],
            username=request.json["username"],
            password=request.json["password"],
            phone_number=request.json["phonenumber"],
        )
        db.session.add(user)
        db.session.commit()
        logged_user = User.query.with_entities(
            User.id, User.email, User.username, User.phone_number
        ).filter_by(email=request.json["email"])
        user_schema = UserSchema(many=True)
        output = user_schema.dump(logged_user)
        return {"data": output}
    else:
        return {"error": "A user exists with that email"}


@app.route("/api/matches", methods=["GET"])
def get_matches():
    match = Matches.query.all()
    print(match[0].seats)
    match_schema = MatchSchema(many=True)
    output = match_schema.dump(match)
    return {"data": output}


@app.route("/api/ticke", methods=["GET"])
def getall():
    t = Tickets.query.all()
    # print(t[0].seats)
    t_sch = TicketsSchema(many=True)
    output = t_sch.dump(t)
    return {"data": output}


@app.route("/api/tickets/<userid>", methods=["GET"])
def get_tickets(userid):
    ticket_exists = (
        db.session.query(Tickets.id).filter_by(
            userid=userid).first() is not None
    )
    print(ticket_exists)
    if ticket_exists:
        matches = (
            Matches.query.join(Tickets, Tickets.matchid == Matches.id)
            .add_columns(
                Matches.id,
                Tickets.userid,
                Matches.home,
                Matches.away,
                Matches.price,
                Matches.time,
                Matches.date,
                Matches.type_match,
            )
            .filter(Tickets.matchid == Matches.id)
            .filter(Tickets.userid == userid).all()
        )
        print(matches)
        match_schema = MatchSchema(many=True)
        output = match_schema.dump(matches)
        return {"data": output}

    else:
        return {"error": "You have not bought any tickets"}


@app.route("/api/tickets/buy/<userid>/<matchid>", methods=["POST"])
def buy_tickets(userid, matchid):
    match_exists = db.session.query(Matches.id).filter_by(id=matchid).first()
    user_exists = db.session.query(User.id).filter_by(
        id=userid).first() is not None
    if match_exists and user_exists:
        match = Matches.query.filter_by(id=matchid).first()
        if match.seats > 0:
            user = User.query.filter_by(id=userid).first()
            ticket_exists = (
                db.session.query(Tickets).filter_by(
                    userid=userid, matchid=matchid).first()
                is not None
            )
            if ticket_exists:
                return {
                    "error": "You have already bought a ticket for the above fixture"
                }
            else:
                match.seats = match.seats - 1
                ticket = Tickets(
                    userid=user.id,
                    matchid=matchid,
                    ticket_bought=True,
                )
                db.session.add(ticket)
                db.session.commit()

                matches = (
                    Matches.query.join(Tickets, Tickets.matchid == Matches.id)
                    .add_columns(
                        Matches.id,
                        Tickets.userid,
                        Matches.home,
                        Matches.away,
                        Matches.price,
                        Matches.time,
                        Matches.date,
                        Matches.type_match,
                    )
                    .filter(Tickets.matchid == Matches.id)
                    .filter(Tickets.userid == userid)
                )

                match_schema = MatchSchema(many=True)
                output = match_schema.dump(matches)
                return {"data": output}

        else:
            return {"error": "There are no available seats"}


if __name__ == "__main__":
    db.init_app(app)
    db.create_all()
    app.run(debug=True)
