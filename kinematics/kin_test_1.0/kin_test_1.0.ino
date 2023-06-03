#include "Kinematics.h"

#define MOTOR_MAX_RPM 90       // motor's maximum rpm
#define WHEEL_DIAMETER 0.07      // robot's wheel diameter expressed in meters
#define FR_WHEEL_DISTANCE 0   // distance between front wheel and rear wheel
#define LR_WHEEL_DISTANCE 0.2   // distance between left wheel and right wheel
#define PWM_BITS 8              // microcontroller's PWM pin resolution. Arduino Uno/Mega Teensy is using 8 bits(0-255)

Kinematics kinematics(MOTOR_MAX_RPM, WHEEL_DIAMETER, FR_WHEEL_DISTANCE, LR_WHEEL_DISTANCE, PWM_BITS);

//motor pin definitions
int motor1p=D5;
int motor1n=D6;
int motor2p=D7;
int motor2n=D8;

void setup() 
{
    Serial.begin(9600);
    
    //Initialising motor pins
    pinMode(motor1p, OUTPUT);
    pinMode(motor1n, OUTPUT);
    pinMode(motor2p, OUTPUT);
    pinMode(motor2n, OUTPUT);
    //Intialising motor speeds
    analogWrite(motor1p, 0);
    analogWrite(motor1n, 0);
    analogWrite(motor2p, 0);
    analogWrite(motor2n, 0);
}

void rpm_set(int left_rpm, int right_rpm){

  
  analogWrite(motor1p, 0);
  analogWrite(motor1n, 0);
  analogWrite(motor2p, 0);
  analogWrite(motor2n, 0);
}

void loop() 
{
    Kinematics::output rpm;

    //simulated required velocities
    float linear_vel_x = 3;  // 1 m/s
    float linear_vel_y = 1;  // 0 m/s
    float angular_vel_z = 1; // 1 m/s

    //given the required velocities for the robot, you can calculate the rpm required for each motor
    rpm = kinematics.getRPM(linear_vel_x, linear_vel_y, angular_vel_z);

    Serial.print(" FRONT LEFT MOTOR: ");
    // Assuming you have an encoder for each wheel, you can pass this RPM value to a PID controller 
    // as a setpoint and your encoder data as a feedback.
    Serial.print(rpm.motor1);

    Serial.print(" FRONT RIGHT MOTOR: ");
    Serial.print(rpm.motor2);

    Serial.print(" REAR LEFT MOTOR: ");
    Serial.print(rpm.motor3);

    Serial.print(" REAR RIGHT MOTOR: ");
    Serial.println(rpm.motor4);

    delay(10);
}
