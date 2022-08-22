<% if (ensureAuthenticated) { %>
<li class="btn btn-primary" style="margin-right: 25px"><a href="/users/logout" class="text-decoration-none text-white">Logout</a></li>
<% } else { %>
<li class="btn btn-primary" style="margin-right: 25px"><a href="/users/login" class="text-decoration-none text-white">Login</a></li>
<li class="btn btn-primary"><a href="/users/signup" class="text-decoration-none text-white">Signup</a></li>
<% } %>


**This is bold text**

*This text is italicized*

~~This was mistaken text~~

##################################

<% if(!user) { %>
<p class="mb-0">Create your account here! <a href="users/signup" class="text-dark-50 fw-bold">Sign Up</a></p>
<% } %>

###########################################

<%= user.name %>

########################################
if(email.match !== validateEmail()){
  errors.push({ msg:'Email is not valid' })
 }


##############################
Check password length...
if(password.length < 6){
  errors.push({ msg:'Password should be at least 6 characters' })
}


###############################
<div class="form-item col-md-4 my-4">
    <label for="bbp_forum_id">Forum Topic:</label><br>
    <select name="bbp_forum_id" id="bbp_forum_id" class="bbp_dropdown">
        <option value="" class="level-0">— No forum —</option>
        <option class="level-0" value="4996">Technology</option>
        <option class="level-0" value="4974">Food</option>
        <option class="level-0" value="5080">City</option>
        <option class="level-0" value="4994">Product</option>
    </select>
</div>

###############################
<div class="aq-notify-check">
    <input class="checkbox-tik" name="bbp_topic_subscription" id="bbp_topic_subscription" type="checkbox" value="bbp_subscribe">
    <label for="bbp_topic_subscription">Notify me of follow-up replies via email</label>
</div>

###############################
route.post('/ask-question', (req, res) => {
const { title, description, tags } = req.body;
const askQuestion = new Question({
title,
description,
tags
})
askQuestion.save()
.then(item => {
res.redirect('/');
})
.catch(err => console.log(err));
console.log(req.body);
})