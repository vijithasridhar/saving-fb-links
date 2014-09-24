var popupPage;
//what happens here?
chrome.browserAction.getPopup(function (result) {
    popupPage = result;
})

run()

/**
add the HTML link "Favorite" after the Share link
calls another function for the onclick() event
*/
function run() {
    var nodesList = getNodesByAttribute("title", "Send this to friends or post it on your timeline."); //Share link
    var node;
    for (i=0; i < nodesList.length; i++) {
        node = nodesList[i];
        //get the node's parent
        node.parent.appendChild('<a href="#" onclick="addToList(event)"> Favorite </a>');        //how should I change it so it behaves/looks like a link?
    }
}

/**
adds the post to the popupPage, using the postName and the postLink
creates a new table row, new table cell and then adds the link/name within that cell
*/
function addToList(node) {
    //finding the postLink
    //6 nodes up from the actual node you appended is where is where the parent of the timestamp is
    //there should be a better way of doing this
    //the class for the link is "_5pcq"
    var sixthparent = node.parent.parent.parent.parent.parent.parent;
    var timestamp = sixthparent.getElementByClass("timestamp");
    var postLink;
    if (timestamp.parent.hasAttribute("href") == true) {
        postLink = timestamp.parent.href;        
    } else {
        var weirdName = timestamp.parent.getElementsByClassName("_5pcq");
        if (weirdName.length != 0) {
            alert(weirdName.length);
            postLink = weirdName[0].href;
        } else {
            alert("Could not find the link for this post.");
            return;
        }
    }
    
    //apparently I need to make an HTML request to get the tab/post title
    var postName = postLink;
    
    //adding the post to the table
    var starTable = popupPage.getElementsByTagName("table");
    var tr = popupPage.createElement("tr");
    var td = popupPage.createElement("td");
    var link = popupPage.createElement("a");
    a.href = postLink;
    var name = popupPage.createTextNode(postName);
    a.appendChild(name);
    td.appendChild(a);
    tr.appendChild(td);
    starTable.appendChild(tr);
}

/**
returns all the nodes in the DOM of the document based on a given attribute 
and an attribute value
used to find all the Share links in a page 
*/
function getNodesByAttribute(attr, attrVal) {
    var nodes = [];
    var allNodes = document.getElementsByTagName("*");
    for (i=0; i < allNodes.length; i++) {
        if (allNodes[i].hasAttribute("name") == true && allNodes[i].getAttribute("name") = attrVal) {
            elems.push(allNodes[i]);
        }
    }
    return nodes;
}