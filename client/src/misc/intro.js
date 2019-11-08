export const introSteps = [
  {
    element: '.title',
    intro: 'Welcome! This is a Shopify Plus multipass example implementation \
    for anyone looking to understand how the feature works by getting their hands on it.',
    position: 'right',
    tooltipClass: 'myTooltipClass'
  },
  {
    element: '.form',
    intro: 'In this example we can create a user in a non-Shopify database. When we click to create a new user, \
    A user record is created in the database. Once that user is successfully created, \
    an authentication process begins. During this process, the Multipass API is used to create a session (i.e. sign the user in) on the Shopify store. \
    Go ahead and create your user by clicking the "Create New User" button.' ,
    position: 'right',
    highlightClass: 'myHighlightClass'
  },
  {
    element: '.user-message',
    intro: 'Once we receive confirmation that our user is authenticated against our user database \
    and multipass has created session, multipass can be used generate a URL that we can send \
    the user to. This URL is returned to us via an API response. We can use this URL to redirect our user to the store automatically, \
    or we can display it somewhere on the web page. Like here.',
    position: 'right'
  }
]

export const stepOptions = {
  keyboardNavigation: false
}

export const introHints = [
  {
    element: '.title',
    hint: 'Welcome! This is a Shopify Plus multipass example implementation \
    for anyone looking to understand how the feature works by getting their hands on it.',
    hintPosition: 'top-left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass'
  },
  {
    element: '.form',
    hint: 'In this example we can create a user in a non-Shopify database. When we click to create a new user, \
    A user record is created in the database. Once that user is successfully created, \
    an authentication process begins. During this process, the Multipass API is used to create a session (i.e. sign the user in) on the Shopify store. \
    Go ahead and create your user by clicking the "Create New User" button.' ,
    hintPosition: 'top-left'
  },
  {
    element: '.user-message',
    hint: 'Once we receive confirmation that our user is authenticated against our user database \
    and multipass has created session, multipass can be used generate a URL that we can send \
    the user to. This URL is returned to us via an API response. We can use this URL to redirect our user to the store automatically, \
    or we can display it somewhere on the web page. Like here.',
    hintPosition: 'top-left'
  }
]