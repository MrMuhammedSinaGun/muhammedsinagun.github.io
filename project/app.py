from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Ana sayfa rotası
@app.route("/")
def home():
    return render_template("index.html")

# Mesaj gönderme API'si
@app.route("/send_message", methods=["POST"])
def send_message():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Veriyi kaydetme (dosyaya yazma örneği)
    with open("messages.txt", "a") as file:
        file.write(f"Name: {name}, Email: {email}, Message: {message}\n")

    return jsonify({"status": "success", "message": "Message received!"})

if __name__ == "__main__":
    app.run(debug=True)

