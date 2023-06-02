//////////////////////////////////////////////
//        RemoteXY include library          //
//////////////////////////////////////////////

// RemoteXY select connection mode and include library
#define REMOTEXY_MODE__ESP8266WIFI_LIB_POINT
#include <ESP8266WiFi.h>

#include <RemoteXY.h>

// RemoteXY connection settings
#define REMOTEXY_WIFI_SSID "RemoteXY"
#define REMOTEXY_WIFI_PASSWORD "12345678"
#define REMOTEXY_SERVER_PORT 6377


// RemoteXY configurate
#pragma pack(push, 1)
uint8_t RemoteXY_CONF[] =   // 43 bytes
   { 255,2,0,0,0,36,0,16,27,5,5,32,16,34,30,30,0,217,26,31,
  131,1,3,3,56,7,1,217,24,82,111,98,111,116,32,67,111,110,116,114,
  111,108,0 };
  
// this structure defines all the variables and events of your control interface 
struct {

    // input variables
  int8_t joy_x; // from -100 to 100  
  int8_t joy_y; // from -100 to 100 

    // other variable
  uint8_t connect_flag;  // =1 if wire connected, else =0  

} RemoteXY;
#pragma pack(pop)

/////////////////////////////////////////////
//           END RemoteXY include          //
/////////////////////////////////////////////


int motor1p=D5;
int motor1n=D6;
int motor2p=D7;
int motor2n=D8;

int left=0, right = 0;

struct{
  int x;
  int y;
  int dist;
}cd;


void coordinate_init(){
  cd.x = RemoteXY.joy_x;
  cd.y = RemoteXY.joy_y;
  cd.dist = pow((pow(cd.x,2)+pow(cd.y,2)), 0.5);
  if (cd.dist>101){
    cd.x=(100*cd.x)/cd.dist;
    cd.y=(100*cd.y)/cd.dist;
    cd.dist = pow((pow(cd.x,2)+pow(cd.y,2)), 0.5);
  }
}


void setup() {
  Serial.begin(9600);
  RemoteXY_Init();
  
  pinMode(motor1p, OUTPUT);
  pinMode(motor1n, OUTPUT);
  pinMode(motor2p, OUTPUT);
  pinMode(motor2n, OUTPUT);
  
  analogWrite(motor1p, 0);
  analogWrite(motor1n, 0);
  analogWrite(motor2p, 0);
  analogWrite(motor2n, 0);
  // TODO you setup code
}

void loop() {
  RemoteXY_Handler();
  coordinate_init();

  int left=cd.y+cd.x;
  int right=cd.y-cd.x;

  if(left<0){
    left = map(-left,0,100, 0, 255);
    analogWrite(D5, 0);
    analogWrite(D6, left);
  }
  else{
    left = map(left,0,100, 0, 255);
    analogWrite(D5, left);
    analogWrite(D6, 0);
  }

  if(right<0){
    right = map(-right,0,100, 0, 255);
    analogWrite(D7, 0);
    analogWrite(D8, right);
  }
  else{
    right = map(right,0,100, 0, 255);
    analogWrite(D7, right);
    analogWrite(D8, 0);
  }

  /*
  Serial.print(speed.left);
  Serial.print("\t");
  Serial.println(speed.right);
  */
}