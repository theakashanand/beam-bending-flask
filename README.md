<h1 align = "center">
  <a href="www.beam-designer.herokuapp.com">2D Beam Bending Simulator</a>
</h1>
<p align="center">
  A flask web application to simulate bending of beams under custom constraints and loading conditions.
</p>

<p align="center">
  <a href="https://github.com/theakashanand/beam-bending-flask/releases"><img alt="Release" src="https://img.shields.io/github/release/theakashanand/beam-bending-flask.svg"/></a>
  <a href="https://github.com/theakashanand/beam-bending-flask"><img alt="Code Size" src="https://img.shields.io/github/languages/code-size/theakashanand/beam-bending-flask.svg"/></a>
</p>

## What's new?

#### v1.0.0
* First release.
* Input Capabilities: Any arbitrary number of fixed supports, pin suppports, roller supports, point loads, moments, and distributed loads.
* Supports constant, linear ramp, trapezoidal ramp, and general degree polynomial distributed loads.
* Geometry: Beam shape may be rectangular, circular, pipe, I beam, or any custom moment of inertia.
* Any arbitrary Young's modulus
* Results: Plots shear force, bending moment, displacement, and slope of the loaded beam. Additionally gives a pictorial representation of the beam and it's loading conditions.
* Full version report available <a href = "https://github.com/theakashanand/beam-bending-flask/blob/master/docs/assets/beam_app_v1.0.0.pdf">here</a>

## Screenshots
<p align="center">
  <img alt="Inputs" src="https://github.com/theakashanand/beam-bending-flask/blob/master/docs/assets/screenshots/InputsDistributedLoadScreenshot.png" width=800/>
</p>

<p align="center">
  <img alt="Results" src="https://github.com/theakashanand/beam-bending-flask/blob/master/docs/assets/screenshots/ShearForceScreenshot.jpg" width=800/>
</p>


## Getting started

### Demo
Live demo running on <a href="www.beam-designer.herokuapp.com">www.beam-designer.herokuapp.com</a>

### Dependencies

* Python 3
* HTML 5

### Setup
Clone this repo to your local machine and cd into the new directory
```
git clone https://github.com/theakashanand/beam-bending-flask.git
cd beam-bending-flask
```
Create a virtual environment within the new directory and activate it
```
virtualenv venv -p python3
source venv/bin/activate
```
pip install the required python modules using:
```
pip install -r requirements.txt
```
Run the web application on your local server using
```
python application.py
```
By default the web application should be running on localhost:5000

