import json

def generate_team_html(team_members):
    executives_html = """
    <div class="row animate-box">
        <div class="col-md-8 col-md-offset-2 text-center gtco-heading">
            <h2>Executive Board</h2>
        </div>
    </div>
    """

    consultants_html = """
    <div class="row animate-box">
        <div class="col-md-8 col-md-offset-2 text-center gtco-heading">
            <h2>Consultants</h2>
        </div>
    </div>
    """

    # Helper function to handle optional fields
    def optional_fields(member):
        details_html = ""
        if "joined" in member and member["joined"]:
            details_html += f'<p class="text">Joined: {member["joined"]}</p>\n'
        if "major" in member and member["major"]:
            details_html += f'<p class="text">Major: {member["major"]}</p>\n'
        if "minor" in member and member["minor"]:
            details_html += f'<p class="text">Minor: {member["minor"]}</p>\n'
        if "career_interest" in member and member["career_interest"]:
            details_html += f'<p class="text">Career Interest: {member["career_interest"]}</p>\n'
        if "hobbies" in member and member["hobbies"]:
            details_html += f'<p class="text">Hobbies: {member["hobbies"]}</p>\n'
        return details_html

    # Generate HTML for executives
    for i, executive in enumerate(team_members['executives']):
        if i % 4 == 0:
            if i != 0:
                executives_html += "</div>"  # Close previous row if it's not the first row
            executives_html += '<div class="row row-pb-md justify-content-center">\n'

        image_path = f"images/members/{executive.get('image', 'default.jpg')}"
        executives_html += f"""
        <div class="col-md-3 col-sm-6 animate-box" data-animate-effect="fadeIn">
            <div class="hoverme">
                <div class="gtco-staff">
                    <img src="{image_path}" alt="{executive['name']}" class="circular-image">
                    <h3>{executive['name']}</h3>
                    <strong class="role">{executive['role']}</strong>
                    <ul class="gtco-social-icons">
                        <li><a href="{executive['linkedin']}"><i class="icon-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        """

    executives_html += "</div>"  # Close the last row

    # Generate HTML for consultants
    for i, consultant in enumerate(team_members['consultants']):
        if i % 4 == 0:
            if i != 0:
                consultants_html += "</div>"  # Close previous row if it's not the first row
            consultants_html += '<div class="row row-pb-md justify-content-center">\n'

        image_path = f"images/members/{consultant.get('image', 'default.jpg')}"
        consultants_html += f"""
        <div class="col-md-3 col-sm-6 animate-box" data-animate-effect="fadeIn">
            <div class="hoverme">
                <div class="gtco-staff">
                    <img src="{image_path}" alt="{consultant['name']}"  class="circular-image">
                    <h3>{consultant['name']}</h3>
                    <strong class="role">{consultant['role']}</strong>
                    <ul class="gtco-social-icons">
                        <li><a href="{consultant['linkedin']}"><i class="icon-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        """

    consultants_html += "</div>"  # Close the last row

    return executives_html, consultants_html

# Read the JSON data from the file
with open('updated_members.json', 'r') as json_file:
    team_members = json.load(json_file)

# Generate team HTML sections
executives_html, consultants_html = generate_team_html(team_members)

# Read the template file
with open('about_template.html', 'r') as template_file:
    template_content = template_file.read()

# Replace placeholders with generated HTML
updated_content = template_content.replace("<!-- EXECUTIVES_PLACEHOLDER -->", executives_html)
updated_content = updated_content.replace("<!-- CONSULTANTS_PLACEHOLDER -->", consultants_html)

# Write the updated content to a new HTML file
with open('about_updated.html', 'w') as updated_file:
    updated_file.write(updated_content)

print("Updated HTML file has been generated: 'about_updated.html'")