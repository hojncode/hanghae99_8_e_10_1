from flask import Flask, render_template, jsonify, request, Blueprint
# 회원가입시 pw 암호화 해싱
import hashlib

# jwt 토큰 생성
import jwt

# SECRET_KEY = "sparta"

# 시간 라이브러리
import datetime
# 토큰을 만들때 유효기간을 설정하기 위해서 서버시간을 가져와서 그로부터 얼마만큼 유효하게 설정하기 위해 필요
from datetime import datetime, timedelta

# 파이몽고 라이브러리
# from pymongo import MongoClient
#
# # client = MongoClient('localhost', 27017)
# client = MongoClient('15.165.158.21', 27017, username="test", password="test")
# db = client.playGround
#
# app = Flask(__name__)
#
# user = Blueprint('user', __name__)


