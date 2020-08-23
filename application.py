from flask import Flask, render_template, request, jsonify
from flask_bootstrap import Bootstrap
from compute import *
import os

config = {
    "DEBUG": False,          # some Flask specific configs    
}


app=Flask(__name__)
app.config['SECRET_KEY'] ="replace_later"
bootstrap = Bootstrap(app)

res_beam = SolvedBeam()


@app.route('/help')
def help():
    return render_template('help.html')

@app.route('/about_app')
def about_app():
    return render_template('about_app.html')

@app.route('/about_dev')
def about_dev():
    return render_template('about_dev.html')

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')


@app.route('/results')
def results():

    return render_template('results.html', blen = res_beam.blen, E = res_beam.E, I = res_beam.I, load_func= res_beam.load_func, reactions = res_beam.reactions, 
    sf_func = res_beam.sf_func, max_sf = res_beam.max_sf, max_sf_loc = res_beam.max_sf_loc, 
    bm_func = res_beam.bm_func, max_bm = res_beam.max_bm, max_bm_loc = res_beam.max_bm_loc, 
    slope_func = res_beam.slope_func,
    defl_func = res_beam.defl_func, max_defl = res_beam.max_defl, max_defl_loc = res_beam.max_defl_loc,time=res_beam.tot_time)

@app.route('/troubleshoot')
def troubleshoot():
    return render_template("error_support.html")

@app.route('/process', methods=['GET','POST'])
def process():
    global res_beam

    try:

        #getting from client
        E = request.form['ElaMod']
        I = request.form['SecMom']
        blen = request.form['bLen']
        sup_types = request.form['supTypes']
        sup_locs = request.form['supLocs']
        pl_forces = request.form['plForces']
        pl_locs = request.form['plLocs']
        mom_moments = request.form['momMoments']
        mom_locs = request.form['momLocs']
        dl_loads = request.form['dlLoads']
        dl_orders = request.form['dlOrders']
        dl_starts = request.form['dlStarts']
        dl_stops = request.form['dlStops']

        #converting json strings to arrays
        sup_types = stringToArray(sup_types)
        sup_locs = stringToArray(sup_locs)
        pl_forces = stringToArray(pl_forces)
        pl_locs = stringToArray(pl_locs)
        mom_moments = stringToArray(mom_moments)
        mom_locs = stringToArray(mom_locs)
        dl_loads = stringToArray(dl_loads)
        dl_orders = stringToArray(dl_orders)
        dl_starts = stringToArray(dl_starts)
        dl_stops = stringToArray(dl_stops)

        res_beam = computeBeam(E, I, blen, sup_types, sup_locs, pl_forces,pl_locs, mom_moments, mom_locs, dl_loads, dl_orders, dl_starts, dl_stops)
        

        return jsonify({'status':1,
                        'errorMessage':"",
                        'defl_status':1,
                        })



    except Exception as e:
        print(str(e))
        return jsonify({'status':0,
                        'errorMessage':str(e),
                        'defl_status':0,
            
        })


def stringToArray(string):
    string = string[1:-1]
    string = string.replace('\"','')
    string = string.split(',')
    return string



if(__name__=="__main__"):
    app.run()
