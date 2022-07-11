from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'

@app.route('/login')
def mypage():
   return render_template('login.html')

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)