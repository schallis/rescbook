//
//  ConfirmViewController.swift
//  RescBookApp
//
//  Created by Steven Challis on 7/14/15.
//  Copyright (c) 2015 Steven Challis. All rights reserved.
//

import UIKit

class ConfirmViewController: UIViewController {
    
    var seconds = 3

    @IBOutlet weak var timerLabel: UILabel!
    
    func setTime() {
        self.timerLabel.text = "Confirming in \(self.seconds)..."
    }
    
    func subtractTime() {
        self.seconds--
        self.setTime()
        if(self.seconds == 0)  {
            super.performSegueWithIdentifier("ShowQuestions", sender: nil)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setTime()
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        
        NSTimer.scheduledTimerWithTimeInterval(1.0, target: self, selector: Selector("subtractTime"), userInfo: nil, repeats: true)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
