from sympy.physics.continuum_mechanics.beam import Beam
from sympy import *
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import time

debug=False
s1 = 0


class SolvedBeam:
    def __init__(self,E=2E9, I=3E6, blen=10, load_func=0, reactions=[],\
        sf_func=0, max_sf=0, max_sf_loc=-1,\
        bm_func=0,max_bm=0, max_bm_loc=-1,\
        slope_func=0,\
        defl_func=0, max_defl=0, max_defl_loc=-1, time=0 ):

        self.E = E
        self.I = I
        self.blen = blen
        self.load_func = load_func
        self.reactions=reactions

        self.sf_func = sf_func
        self.max_sf = max_sf
        self.max_sf_loc = max_sf_loc
        self.bm_func = bm_func
        self.max_bm = max_bm
        self.max_bm_loc = max_bm_loc
        self.slope_func = slope_func
        self.defl_func = defl_func
        self.max_defl = max_defl
        self.max_defl_loc = max_defl_loc
        
        self.tot_time = time
        

def computeBeam(E_mod, I_inertia, blen, sup_types, sup_locs, pl_forces, pl_locs, mom_moments, mom_locs, dl_loads, dl_orders, dl_starts, dl_stops):
    print("debug: ", debug)
    global s1
    s1=time.time()
    if(debug):
        print("S1: ", s1, time.time()-s1)
    E, I = symbols('E, I')
    E=E_mod
    I=I_inertia
    print(blen, E, I)
    b = Beam(blen, E, I) #creating beam object

    
    #support conditions
    if(len(sup_types)>0):
        for index in range(0,len(sup_types)):
            location = float(sup_locs[index])
            sup = sup_types[index]
            b.apply_support(location, sup.lower()) #sup is in the form 'Fixed' or 'Roller' or 'Pin'

    #applying point loads
    if(pl_forces!=['']):
        for index in range(0, len(pl_forces)):
            b.apply_load(float(pl_forces[index]),float(pl_locs[index]),-1)

    #applying moments
    if(mom_moments!=['']):
        for index in range(0, len(mom_moments)):
            b.apply_load(float(mom_moments[index]), float(mom_locs[index]),-2)    
    
    #applying distributed loads
    if(dl_loads!=['']):
        for index in range (0,len(dl_loads)):
            w = float(dl_loads[index])
            start = float(dl_starts[index])
            stop = float(dl_stops[index])
            order = int(dl_orders[index])

            b.apply_load(w, start, order, end=stop)

    #-------------------------------------------------------------------------------------------------------------------------
    # at this stage we have a beam object with all the support and loading conditions finalized. Time to calculate...
    #-------------------------------------------------------------------------------------------------------------------------

    #dictionary with all the reaction load variables
    load_func=str(b.load)
    if(debug):
        print("\nTIME:", time.time()-s1)
        print("LOAD FUNC: ", load_func)
    reactions = getReactionVarsDict(load_func)

    #preparing parameters to pass to b.solve_for_reaction_loads()
    params = ''
    for key in reactions:
        params = params+"reactions['"+key+"']," 

    params = params.rstrip(',')

    #creating command to solve for reaction loads
    solve_for_reacs = "b.solve_for_reaction_loads("+params+")"
    eval(solve_for_reacs)

    #-------------------------------------------------------------------------------------------------------------------------
    # at this stage all the calculations are done and the beam is solved. Time to extract the results...
    #-------------------------------------------------------------------------------------------------------------------------
    maxflag=False
    if(len(pl_forces)<2 and len(mom_moments)<2 and dl_loads[0]=='' and len(sup_types)==1):
        maxflag=True

    load_func = str(b.load)
    if(debug):
        print("\nTIME:", time.time()-s1)
        print("\nload_func: ", load_func)
    reactions = str(b.reaction_loads)

    
    sf, max_sf_loc, max_sf = getShearForce(b, maxflag)
    
    bm, max_bm_loc, max_bm = getBendingMoment(b, maxflag)
   
    defl, max_defl_loc, max_defl = getDeflection(b, maxflag)
    
    #Shear Force and Bending Moment Functions
    sf_func = str(sf)
    if(debug):
        print("\nProblem 5:", time.time()-s1)
        print("\nsf_func: ", sf_func)
    bm_func = str(bm)
    if(debug):
        print("\nTIME:", time.time()-s1)
        print("\nbm_func: ", bm_func)
    
    slope_func = str(getSlope(b))
    if(debug):
        print("\nTIME:", time.time()-s1)
        print("\nslope_func: ", slope_func)

    defl_func = str(defl)
    if(debug):
        print("\nTIME:", time.time()-s1)
        print("\defl_func: ", defl_func)    

    getDrawing(b)
    tot_time = time.time()-s1

    #final results
    res_beam = SolvedBeam(E, I, blen, load_func, reactions,\
        sf_func, max_sf, max_sf_loc,\
        bm_func,max_bm, max_bm_loc,\
        slope_func,\
        defl_func, max_defl, max_defl_loc, tot_time)
    
    
    return res_beam
    
def getShearForce(b, maxflag=False):
    try:
        if(debug):
            print("\nTIME:", time.time()-s1)
            print('\nGot shear force...')
        b.plot_shear_force()
        if(debug):
            print("\nTIME:", time.time()-s1)
            print('Shear force plotted...')
        plt.savefig('static/sf_results.png')
        if(debug):
            print('Shear force saved...')
        if (maxflag):
            maxsf = b.max_shear_force()
            #to save time
        else:
            maxsf=(-1,0)
        if(debug):
            print("maxsf: ", maxsf)
        return b.shear_force(), maxsf[0], maxsf[1]
    except Exception as e:
        return ('Shear Force unavailable: '+ str(e)),0,0

def getBendingMoment(b, maxflag=False):
    try:
        if(debug):
            print("\nTIME:", time.time()-s1)
            print('\nGot bending moment...')
        b.plot_bending_moment()
        if(debug):
            print("\nTIME:", time.time()-s1)
            print('Bending moment plotted...')
        plt.savefig('static/bm_results.png')
        if(debug):
            print("\nTIME:", time.time()-s1)
            print('Bending moment saved...')
        if(maxflag):
            maxbm = b.max_bmoment()
            #to save time
        else:
            maxbm = (-1,0)
        if(debug):
            print("maxbm: ", maxbm)
        return b.bending_moment(), maxbm[0], maxbm[1]
    except Exception as e:
        return ("Bending moment unavailable: "+ str(e)),0,0

def getSlope(b):
    try:
        print("\nGot Slope...")
        b.plot_slope()
        print("Slope plotted...")
        plt.savefig('static/slope_results.png')
        print("Slope saved...")
        return b.slope()
    except Exception as e:
        print("\nSlope unavailable")
        return ("Slope unavailable: "+ str(e))

def getDeflection(b, maxflag=False):
    try:
        print('\nGot deflection...')
        b.plot_deflection()
        print('Deflection plotted...')
        plt.savefig('static/defl_results.png')
        print('Deflection  saved...')
        de = b.deflection()
        
        if(debug):
            print("de: ", de)
            print("P1: ", time.time()-s1)
        '''if (maxflag):
            print("max_deflection: ", b.max_deflection())
            maxdef= b.max_deflection()[1]
            maxloc= b.max_deflection()[0]
            print("maxdef: ", maxdef)
        #The above is taking too much time
        #max_deflection() function is not working
        '''
        maxdef=0
        maxloc=0
        if(debug):
            print("maxdef: ", maxdef)
            print("P2: ", time.time()-s1)
        return de,maxloc,maxdef
    except Exception as e:
        from sympy import Symbol, Eq, plot_implicit
        x2 = Symbol('x2')
        plot_implicit(Eq(x2, 0))
        plt.savefig('static/defl_results.png')
        print("\nDeflection unavailable")
        return ("Deflection unavailable: "+ str(e)),0,0

def getDrawing(b):
    try:
        print("\nGot Drawing...")
        pic = b.draw(pictorial=False)
        pic.save('static/beam_drawing.png')
    except Exception as e:
        print("Drawing unavailable")
        return ("Drawing unavailable: "+e)

        

def getReactionVarsArr(load_func):
    arr = load_func.split("+")
    def stripStar(string):
        index = 0
        for char in string:
            if (char!="*"):
                index = index+1
            else:
                break
        return(string[:index])
    for i in range(0,len(arr)):
        arr[i] = stripStar(arr[i])
    return arr

def getReactionVarsDict(load_func):
    reaction_vars = getReactionVarsArr(load_func)
    print("reaction_vars: ", reaction_vars)
    reactions = {}
    for i in range(0,len(reaction_vars)):
        key = reaction_vars[i].strip()
        value = symbols(str(key))
        reactions[key]=value
    return reactions

        

