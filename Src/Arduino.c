#include "DHT.h"
#include <WiFi.h>
#include <FirebaseESP32.h>

#define DHTPIN 15    // modify to the pin we connected
#define DHTTYPE DHT21   // AM2301 
DHT dht(DHTPIN, DHTTYPE);

#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

FirebaseData firebaseData;
FirebaseJson json;

float h,t;
int led = 0;
byte x = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.printf("Connecting to %s ", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println(".");
  Serial.println("Connected!");
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  dht.begin();
}
void getValueHT()
{
  h = dht.readHumidity();
  t = dht.readTemperature(); 
  if (isnan(t) || isnan(h)) 
 {
   Serial.println("Failed to read from DHT");
 } 
 else
 {
  if (x == 0){
    if(t > 28 ){
        digitalWrite(LED_BUILTIN, HIGH);          
        led = 1;      
    }
    else{
       digitalWrite(LED_BUILTIN, LOW);  
        led = 0;
    }}
    else if (x==1){
      digitalWrite(LED_BUILTIN, HIGH);          
        led = 1;
    }else{
       digitalWrite(LED_BUILTIN, LOW);  
        led = 0;
      }
  
  Serial.print("Humidity: "); 
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: "); 
  Serial.print(t);
  Serial.println(" *C\t");
 }
}
void updateValueToFB()
{
  json.set("/Temperature",t);
  json.set("/Humidity",h);
  json.set("/zLed",led);
  Firebase.updateNode(firebaseData,"/Sensor",json);
}
void getValueToFB()
{
  if(Firebase.getInt(firebaseData, "/control/control")) x = firebaseData.intData(); 
  Serial.print("x: "); 
  Serial.print(x);
  Serial.println(" \t");
}0
void loop()
{
  getValueHT();
  updateValueToFB();
  getValueToFB();
  delay(500);
}