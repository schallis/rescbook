//
//  ViewController.swift
//  RescBookApp
//
//  Created by Steven Challis on 7/8/15.
//  Copyright (c) 2015 Steven Challis. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

let url = "http://isos.herokuapp.com"
//let url = "localhost:3000"

extension NSDate {
    var formatted: String {
        let formatter = NSDateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
        formatter.timeZone = NSTimeZone(forSecondsFromGMT: 0)
        formatter.calendar = NSCalendar(calendarIdentifier: NSCalendarIdentifierISO8601)!
        formatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
        return formatter.stringFromDate(self)
    }
}

class ViewController: UIViewController {

    let socket = SocketIOClient(socketURL: url)


    override func viewDidLoad() {
        super.viewDidLoad()
        self.socket.connect()
        print("Connecting SocketIO to \(self.socket.socketURL)")
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func prepareForUnwind(segue: UIStoryboardSegue) {
    }
    
    @IBAction func createIncident(sender : AnyObject) {
        print("Creating Incident...", terminator: "")
        
        let myJSON = [
            "type": "fire",
            "device_datetime": NSDate().formatted,
            "location": [
                "longitude": -73.960,
                "latitude": 40.764,
            ],
            "personal": [
                "conditions": "None",
                "allergies": "None",
                "medications": "None",
                "blood": "O -",
                "partner": "Bill +1 (347) 302 3735",
            ]
        ]
        self.socket.emit("incident", myJSON)
        
        print("Created", terminator: "")
//        performSegueWithIdentifier("ReportIncident", sender: nil)
    }

}

