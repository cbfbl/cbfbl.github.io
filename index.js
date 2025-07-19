const main_text_base_classes = "rainbow_text main_text"

function setTheme() {
    const body = document.body;
    if (body.classList.contains('dark_mode')) {
        body.classList.remove('dark_mode');
        body.classList.add('light_mode');
        document.querySelector('.theme_toggle').textContent = '🌙';
    } else {
        body.classList.remove('light_mode');
        body.classList.add('dark_mode');
        document.querySelector('.theme_toggle').textContent = '🌞';
    }
}


function populateAboutMe(main_div){
    main_div.className = main_text_base_classes;
    main_div.innerHTML = "";

    fetch("content/about_me.txt").then(
        response => response.text()
    ).then(text => {
        main_div.textContent = text;
    });    
}


function populateThingILike(main_div){
    main_div.className = main_text_base_classes + " things_I_like";

    fetch("content/things_I_like.json").then(
        response => response.json()
    ).then(likes => {
        populateContent(likes);
    });

}


function populateMyFriends(main_div){
    main_div.className = main_text_base_classes + " my_friends";
    
    fetch("content/my_friends.json").then(
        response => response.json()
    ).then(friends => {
        populateContent(friends);
    });
}


function populateContent(data){
    main_div = document.getElementById("the_main");
    main_div.innerHTML = "";
    
    fetch("misc/links_connection.json").then(
        response => response.json()
    ).then(links => {
        for (const [key, value] of Object.entries(data)){
            if (Object.hasOwn(links, key)){
                added_content = document.createElement('a');
                added_content.href = links[key];
            }
            else {
                added_content = document.createElement('div');
            }
            added_content.textContent = key;

            added_description = document.createElement('div');
            added_description.textContent = value;

            main_div.appendChild(added_content)
            main_div.appendChild(added_description)
        };
    });
}


function unknownIdBalex(main_div){
    main_div.innerHTML = "";
    main_div.textContent = "404";
}


document.addEventListener('DOMContentLoaded', function() {
    
    const main_div = document.getElementById("the_main");
    const first_page = "about_me";
    const active_class = "balex_active"
    const BALEX_content_output = {
        "about_me": populateAboutMe,
        "things_I_like": populateThingILike,
        "my_friends": populateMyFriends
    };

    for (const child of document.getElementById("BALEX").children){
        child.addEventListener("click", function(){
            const child_id = child.id;
            if (child_id in BALEX_content_output){
                BALEX_content_output[child_id](main_div);
            }
            else {
                unknownIdBalex(main_div)
            }
            for (const child of document.getElementById("BALEX").children){
                if (child.id == child_id){
                    child.classList.add(active_class);
                }
                else {
                    child.classList.remove(active_class);
                }
            }
        });   
    };
    BALEX_content_output[first_page](main_div);
    document.getElementById(first_page).classList.add(active_class);
});