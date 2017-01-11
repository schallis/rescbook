//
//  PageContentViewController.swift
//  RescBookApp
//
//  Created by Steven Challis on 7/14/15.
//  Copyright © 2015 Steven Challis. All rights reserved.
//

import UIKit

class PageViewController: UIPageViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let pageOneController = self.storyboard?.instantiateViewControllerWithIdentifier("Question1")
        self.setViewControllers([pageOneController!], direction: UIPageViewControllerNavigationDirection.Forward, animated: true, completion: nil)
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)

    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}

