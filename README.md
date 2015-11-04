#Snake
Snakes is a very simple game, written server-side in Node.JS, that uses Paper.JS on the client.
The scope of the game is to survive for as long as possible, without hitting any of the other players.

#Installation
To install the server of this game, simply clone the contents of this repository to your machine.

#Dependencies
Before using this code, make sure that you have Node.JS and the following Node.JS modules installed:
- express
- paper
- ws
- tape (tests)

To install any of them, simply use npm:  __npm install *moduleName*__

As the game uses HTTPS, you will also need a SSL key and certificate. They have to be located in the folder bin (which should be located in the root directory of the project), under the names crt.pem and key.pem. You can get those from a certificate authority or you can generate one yourself using OpenSSL. For the latter, use the following command, while in the folder bin:

 - **openssl req -x509 -newkey rsa:1024 -keyout key.pem -out cert.pem -days XXX** 

#Usage
To start this server, simply run the file www located in the bin folder of the project:  node www .
