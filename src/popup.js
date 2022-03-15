export default class Popup {
    constructor(parent, custom_html) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.make();
    }

    make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.hide();

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    show(options) { //fixme
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }
        if (!options.position) {
            options.position = 'left';
        }
        const target_element = options.target_element;
        
        let html = "<select name=\"actionCode\" id=\"actionCode\">" + 
        "<option value=\"A\">A</option>\n" + 
        "<option value=\"B\">B</option>\n" + 
        "<option value=\"C\">C</option>\n" + 
        "<option value=\"D\">D</option>\n" +
        "<option value=\"E\">E</option>\n" + 
        "<option value=\"F\">F</option>\n" + 
        "<option value=\"G\">G</option>\n" + 
        "<option value=\"K\">K</option>\n" +
        "<option value=\"R\">R</option>\n" + 
        "<option value=\"X\">X</option>\n" +   
        "</select>";
        html += '<div class="pointer"></div>';
            console.log("in popup function");
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.pointer');
            let dropdown = document.getElementById("actionCode");
            for ( var i = 0; i < dropdown.options.length; i++ ) {

                if ( dropdown.options[i].text == options.task.submittal.designerReviewResultCode) {
                    dropdown.options[i].selected = true
                }
            }
            
 
            document.addEventListener('input', function () {
                if(options.task.id === "Submit") {
                    options.task.submittal.designerReviewResultCode = dropdown.value;
                    options.task.submittal.designerReviewDate = options.task.end;
                }
                else if(options.task.id === "Submit to Gov") {
                    options.task.submittal.otherReviewResultCode = dropdown.value;
                    options.task.submittal.otherReviewDate = options.task.end;
                }
                
                if (dropdown.value === "A" || dropdown.value === "B" || dropdown.value === "D" || dropdown.value === "F"
                || dropdown.value === "K" || dropdown.value === "R") {
                    options.task.custom_class = "bar-completed";
                }
                else {
                    options.task.custom_class = "bar-late"
                }
                console.log(options.task.submittal.designerReviewResultCode);
            
            });
        

        // set position
        let position_meta;
        if (target_element instanceof HTMLElement) {
            position_meta = target_element.getBoundingClientRect();
        } else if (target_element instanceof SVGElement) {
            position_meta = options.target_element.getBBox();
        }

        if (options.position === 'left') {
            this.parent.style.left =
                position_meta.x + (position_meta.width + 10) + 'px';
            this.parent.style.top = position_meta.y + 'px';

            this.pointer.style.transform = 'rotateZ(90deg)';
            this.pointer.style.left = '-7px';
            this.pointer.style.top = '2px';
        }

        // show
        this.parent.style.opacity = 1;
    }

    hide() {
        this.parent.style.opacity = 0;
        this.parent.style.left = 0;
    }
}
