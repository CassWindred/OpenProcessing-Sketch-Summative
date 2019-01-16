# Attractor Class Documentation
This JS file provides a highly controllable class using the P5 Library which
by default displays a set of particles with trail that are attracted to the mouse, change colour dependent on speed, and become slower the further away they are from the mouse.

This is based on an openprocessing.org sketch by Masaki Yamabe called Attractor 0 which can be found [here](https://www.openprocessing.org/sketch/394718).
It is under the Attribution-ShareAlike 3.0 Unported license which is detailed [here](https://creativecommons.org/licenses/by-sa/3.0/).

This adaptation is also released under the Attribution-ShareAlike 3.0 Unported license.

### Functions

---

#### constructor(pcount=1000, magnetism= 10.0, trail=true):
This is automatically called when a new Attractor object is created.

**Required Parameters:** None

**Optional Parameters: **
* `pcount`:
  *Type: `int` Default: `1000`*
  This defines the starting number of particles on the canvas. Values higher
  than 3000 can start to cause significant lag.

* `magnetism`:
    *Type: `float` Default: `10.0`*
    This defines the starting strength of the the particles attraction towards the mouse.
    Recommended values are between 0-20

* `trail`:
    *Type: `boolean` Default: `true`*
    This defines whether or not the particles will have trails.

---
#### draw(ren)
This function draws the next frame onto either the default canvas or onto a
`p5.renderer` object passed in as `ren`. It is recommended to call this in the
`draw()` function of your main code.

**Required Parameters:** None

**Optional Parameters: **
* `ren`:
  *Type: `p5.renderer` Default: `None`*
  This this is an optional alternative renderer onto which the new frame will be
  drawn.

---

#### addparticle(x=mouseX, y=mouseY)
This function adds a new particle to the list, by default it will be placed
at the location of the mouse, but specific coordinates can be provided

**Required Parameters:** None

**Optional Parameters: **
* `x`:
  *Type: `int` Default: `mouseX` [This is x-coordinate of the mouse]*
  This defines the x coordinate of the particle to be created.

* `y`:
    *Type: `int` Default: `mouseY` [This is y-coordinate of the mouse]*
    This defines the x coordinate of the particle to be created.

---

#### set pcount(newcount)
  This function updates the total number of particles to a new value.
  If the new value is lower than the old value, particles will be deleted,
  starting with those most recently created, if any.
  If the new value is higher then new particles will be created in
   random positions on the canvas. This is automatically used when Attractor.pcount
   is changed.

  **Required Parameters:**
  * `newcount`:
    *Type: `int` *
    This is the new value of pcount, which is the total number of particles.
    Values higher than 3000 can start to cause significant lag.  
[comment]: # (END LIST)
  **Optional Parameters: ** None

  ---

  ### Parameters
  Parameter | Type | Default | Description
  ------------ | ------------- | ---| ---
  pcount | int | `1000` | The number of particles. *recommended Max: 3000*
  trail | boolean | `true` | Defines whether or not there is a trail. Trails are removed by clearing the canvas every cycle.
  traillength | float | `100.0` | If trails are enabled, this defines how long the trails are. A value of 100 means infinite trail *Required Range: 0-100*
  outline | boolean | `false` | Defines whether or not the particles have an outline.
  oulinecolour | *variable* | `'black'` | Sets the colour of the outline. Parameters use rules from [here](https://p5js.org/reference/#/p5/color)
  velocity | float | `1.0` | Sets a velocity multiplier for the particles, 0 will cause the particles to not move.
  opacity | int | `32` | Sets the opacity of the particles, *Recommended Range 0-300*
  blendmode | *variable* | `ADD`| Sets the blend mode of the canvas. It is not recommended to change this. Parameters use rules from [here](https://p5js.org/reference/#/p5/blendMode)
  radius | int | `1` | Sets the pixel radius of each particle.
  magnetism | float | `10.0` | Defines the starting strength of the the particles attraction towards the mouse.
  deceleration | float | `0.95` | Defines how much the particle deceleration each frame based on distance. Lower values mean greater deceleration, a value of one means no deceleration. *Recommended Range: 0.90-1*
  oscillatemax | int | `1` | Defines the max pixel variation of each particle away from the radius while oscillating. Each particle will oscillate in size between the maximum and minimum along a sine curve.
  oscillationspeed| float | `0` | Defines the speed at which the particles oscillate in size, a value of 0 means no oscillation. *Recommended Range: 0.0 - 1.0*
  basecolour | string  | `'#004080'`  | Defines the base colour of each particle. The colour of every particle will vary between this colour and white dependent on speed.



---

### Example Page

The example page demonstrates usage of the Attractor class. It is composed of a set of sliders that control some of the more useful adjustable variables.
The variables they control are shown in the table below, and default to the same values the class defaults too when
and object instance is created. There are also three buttons.  
*Toggle Trails* toggles whether or not the canvas is cleared every draw cycle, which means no trails or faded trails remain visible by toggling the boolean value of `Attractor.trail`.  
*Reset Canvas* runs `setup()` again, completely resetting the canvas without changing the values.  
*Reset Values* resets all of the slider values to their default.  
*Base Colour* brings up a HTML5 colour picker you can use to select `basecolour`.

Slider | Parameter
-------| ----------
Particle Count  | `pcount`
Opacity    | `opacity`
Trail Length  | `traillength`
Velocity  | `velocity`
Oscillation Value  | `oscillatemax`
Oscillation Speed  | `oscillationspeed`
Particle Size  | `radius`
