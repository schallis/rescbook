//
//  File.swift
//  RescBookApp
//
//  Created by Steven Challis on 7/14/15.
//  Copyright © 2015 Steven Challis. All rights reserved.
//


import UIKit
import MapKit

class QuestionOneViewController: UIViewController {
    
    @IBOutlet weak var mapView: MKMapView!
    
    func checkLocationAuthorizationStatus() {
        let usage = CLLocationManager.authorizationStatus()
        print(usage)
        if usage == .AuthorizedWhenInUse {
            mapView.showsUserLocation = true
        } else {
            let locManager = CLLocationManager()
            locManager.requestWhenInUseAuthorization()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        checkLocationAuthorizationStatus()
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}

