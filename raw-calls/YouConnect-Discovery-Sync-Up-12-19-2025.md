# YouConnect Discovery - Sync Up (Dec 19, 2025)

**Recording:** https://fathom.video/share/Mssoc1CYtxzK3atbgUrYcMHXJvk6xP-X  

**Duration:** 31 mins  

**Highlights:** None  


---

## Attendees

- Edward Kruger (Realwired)
- Sunda Scanlon
- Val Vinnakota (brandcave.co)

---

## Transcript

0:02 - Edward Kruger (Realwired)
  Oh, it's so funny.

0:06 - Val Vinnakota (brandcave.co)
  I believe I have done this before, but I'm going to do it a hundred times more. It's just funny.  Gets me every time. Any special plans for Christmas?

0:21 - Edward Kruger (Realwired)
  No, dude, it's just me, man. I just got out of a relationship and so Christmas is cancelled.

0:29 - Val Vinnakota (brandcave.co)
  Oh, yeah.

0:33 - Edward Kruger (Realwired)
  Oops. That sucks.

0:38 - Val Vinnakota (brandcave.co)
  Now, I know what you mean, though.

0:40 - Edward Kruger (Realwired)
  Yeah. So, no, so it's just going to be movies and some good food.

0:46 - Val Vinnakota (brandcave.co)
  Sounds like a good Christmas. Just award those Hallmark movies and you should be good.

0:53 - Edward Kruger (Realwired)
  Yeah, it's not my jam. Like, I'm thinking, like, every year I try to do, you know, what do you call, like, one?  And you know, one kind of like, I mean, like one like franchise. And so last year, I think I did, last year I did Die Hard.  The year before that, I did The Lord of the Rings. And the year before that, I think I did something silly like The Harry Potter ones.  And so this year, I'm thinking of like maybe Alien vs. Predator or like, you know, something in that category.  Perfect.

1:38 - Val Vinnakota (brandcave.co)
  I love you even more now. Yeah, because those are all my Christmas franchises as well. Like I do an annual Lord of the Rings.  Nice. Yeah. The whole director's cut for all the three movies. And if we have time, we do the prequels as well.  And the extended versions.

1:55 - Edward Kruger (Realwired)
  Yeah, yeah. It's probably not Die Hard.

1:59 - Sunda Scanlon
  Mel Gibson was Oh, he's a favorite of mine.

2:01 - Edward Kruger (Realwired)
  Nice. Oh, yeah. Die Hard is Bruce Willis, right?

2:06 - Val Vinnakota (brandcave.co)
  There's Willis.

2:07 - Edward Kruger (Realwired)
  Yeah, yeah.

2:09 - Sunda Scanlon
  Lethal Weapon is the other one I was thinking of. That's right, wasn't Oh, nice.

2:13 - Edward Kruger (Realwired)
  Good choice.

2:14 - Sunda Scanlon
  Yes, Lethal Weapon is another good series. They don't make good movies half the time anymore, though. You just go watch some of this stuff now.  It's like, what? No, I agree, Sunda.

2:27 - Val Vinnakota (brandcave.co)
  But, yeah, like, this year I'm doing, I've already started. Like, I don't have time to, you know, watch continuously.  So, every weekend I'm watching these movies. So, I'm into the hotter genre now, the classics. I've seen Nosferatu and The Frankenstein.  No, that was fun.

2:42 - Edward Kruger (Realwired)
  Frankenstein was good. Yeah, pretty good.

2:47 - Val Vinnakota (brandcave.co)
  All right. Thank you so much for joining, guys. Sunda, I guess I'll let you lead on this, but I'll share my screen and let me know, like, where is the, you know, the sync up you want.  But before that, real quick, I just want to show you where we are at on some of the things that we have changed in the Uconnect onboarding so far.  So, Ed, like from our previous discussion, we wanted to go in the wipe coding route. So we started making some changes where this would be essentially be the starting point for the dev to pick up on.  Okay. So the first party is like once you land in the new URL now, you'll see two ways to onboard or like sign up.  So we have the customer access, which gives us an ability for the user to, you know, give their work email and get the authentication from there.  And they'll quickly see that, yeah, you have been logged in and you're ready to onboard and they'll get into the hub page.  Now.

3:50 - Sunda Scanlon
  Okay. So I want to make sure that this can't be anybody going to here and putting this in because we need to sign.  And the primary team person at the bank, and then they need to invite who they want to invite. So it can't just be anybody can go there and sign up because then people could get.

4:10 - Val Vinnakota (brandcave.co)
  Oh, no, you're right. This isn't a sign up. It's sign in. Like this is link access only after the email has been sent to them.  Okay. All right. Cool. Cool.

4:19 - Sunda Scanlon
  I thought it was signing up. Okay. Makes sense.

4:22 - Val Vinnakota (brandcave.co)
  So for returning customer, they do also have an, you continue with the org SSO, which of course, again, takes them to the hub.  similarly now for the CS team, uh, these are going to be separate authentication screens, but I'm just combining them for the demo purpose, which, uh, brings me to my first question, I guess this would be the time we need to make a decision on, uh, right now, uh, I've coded this app in a way that it is essentially the same app that has two separate flows.  How do you envision, uh, the CS portal as well as the client onboarding hub? Are there, are they going to be two separate apps or this different instance?

5:03 - Edward Kruger (Realwired)
  No. Oh, that's a fascinating question. No, it's going to be two separate things. Okay, perfect.

5:10 - Val Vinnakota (brandcave.co)
  So in that case, we'll have to split this project into two code bases.

5:15 - Edward Kruger (Realwired)
  For now, is demo.

5:16 - Val Vinnakota (brandcave.co)
  is fine. But once we do that, that's what we should be expecting then. All right. Yeah, so there's obviously like quick links to get there.  Sander, I don't know if you have noticed that we now have some extra features on the onboarding hub. Other than the onboarding, you know, the flow that we have seen before, we now promote our products, test them what they already get with the current Uconnect onboarding, as well as other products that if they're interested, they can talk to sales, learn more about it.  Awesome. As well as we have a ticket management system as well, what's open, what's resolved, and the ability to speed  There are new tickets, and an entire page dedicated for the CS team that's dedicated for your particular onboarding. You can always contact them and also see their activity as well.  If they have any tickets on their plate that they're currently reviewing so that there won't be any redundancy and we can maintain some transparency there.  Of course, they can always schedule a meeting to any anonymous agent here that they can get in touch with soon.  But yeah, I believe that your question was regarding, we have added something that isn't there currently on the Uconnect, which is, you know, your templates for request types.  We were experimenting, and from Ed's suggestion, we have thought that, hey, if we were to design templates, like standard essential or commercial focus, which kind of gives you the set of fields, So,  A combination of fields other than providing all the full fields so that they can be quickly accessing that because they can, of course, always add new fields or change the configuration to how all the fields.  We thought we would extend the same experience to requests as well to kind of think of, you know, like what kind of workflows and what kind of request fields would be available.  But these are just placeholder text here. And I'll leave you for your comments here. Yeah.

7:27 - Sunda Scanlon
  So for the property record, you can't, it's kind of misleading the way it's worked because we have one property record and it's a format that has to be used no matter what.  So when you're trying to define standard residential, commercial focus, and full service, not only would that not make sense to the banks, but it's not even available.  You can't have different templates. One property record has to service all facilities at the bank. We do not have the ability to have custom property templates different for residential versus commercial.  And that is exactly. This would make them think. So we cannot have a property record template choice for a quick setup.  And the one that we already have in the system is exactly that. It is the standard fields that most banks would use.  Some banks take some of those fields off and add different fields on, but that is the standard of what most do use.  So I don't think the template side would work on the property record side at all.

8:26 - Edward Kruger (Realwired)
  Is this because the way that I kind of viewed it as layout configuration, you know, so maybe things are on the left and maybe things are on the right.  And we kind of like, is there like common patterns towards that? Yeah.

8:42 - Sunda Scanlon
  So the way that it's set up now, it goes in the way of data entry generally, right? And then if a bank wants a different field and they want to move it up because they have excess land and some banks don't do excess land, then those fields go and they'll go up by.  So they put in the site size now. So again, the template for property should pretty much mimic what our property template is right now.  And that's a starting point for a bank. So we're giving them a starting point with the general specific fields that they would have on it.  And now they can then choose, okay, do I want to keep these fields or do I want to, do I not want to keep these fields?

9:23 - Edward Kruger (Realwired)
  So, you know, so my question is, is this like, we can give them the standard, you know, view, but should we, for example, say like, you know, I just want to give them shortcuts to make the process fast and easy.  And, you know, so I'm thinking is, can we give them like a excess land shortcut that automatically moves the things up?  Like, you know, presents this field in a way that they don't have to worry about, where does this need to go?  I believe I get what you're saying.

9:57 - Val Vinnakota (brandcave.co)
  Like, I mean, I'm totally wrong. And, you know, But imagine layouts essentially already, you know, using all the fields, but maybe different kind of labels, because this is the kind of labels that these type of banks use, and this is the structure in which they are laid out for you.

10:18 - Sunda Scanlon
  So, I'm trying to think here, because labels are something different. And so, there's no shortcut to really going from all the banks we've onboarded to date.  There's no two banks the same. So, to try and make standardizations, and then they edit from there, what I'm saying is there's only like, I don't know what, 30 fields on the property record itself.  So, there's already that kind of standardization. We don't want to throw the kitchen sink at it, and then have them just remove, because sometimes they'll just have everything there, and then nobody's really filling it out.  So, for... Or stuff like, you know, subdivision parcel number, section, township range, or whatever, year built. This is really essentially the fields that they look at.  And if they don't do excess land, they're just going to remove excess land. And they're going to keep site area because that's the land size.  They're going to keep building size. Everybody has to have that. Some are going to want a number of tenants, but they're all going to want ownership type.  So if you were to do that and you made it into templates, no matter what, they're going to be adjusting that template.  Whichever one they chose, it doesn't matter. But that, I think.

11:34 - Edward Kruger (Realwired)
  Yeah, how much time do we normally spend on this page? It takes me maybe 15 minutes to go through it with a client.

11:40 - Sunda Scanlon
  And I can, in that same amount of time, I'm adding fields, removing fields, having people add or remove required fields.  Maybe it's not as big a thing, kind of like unblocking.

11:51 - Edward Kruger (Realwired)
  Right, right.

11:52 - Sunda Scanlon
  So really what it is, is just them going, okay, do I want, you know, these are the fields that I do want.  I don't want this one. And they've added in. So giving them the other choices, now they have to look at each one of those templates.  Ooh, I like these things on this one. Ooh, but then I like these things. I think you're going to slow that process instead of assist with the process.  If there was like some blanketed things that, A, they're going to use this mostly. But I think giving them a couple of choices on the property itself is really going to just muddy the water.  Because they're not going to know which one to start from.

12:28 - Edward Kruger (Realwired)
  No, I hear you. Okay, so Val, I think, you know, I still like the previous page because that's where the help is being served from.  You know, so I still like this as a rest stop. I, listen, this is what you're going to do.  Make sure you have the information. And I still like the full view. But I think, you know, what we'll just do here is make sure that the wording reflects, you know, the action that you're taking here.  So maybe we're not going to say choose your property record template. But we might going to say, you know, modify your property record template and include what you want.

13:10 - Sunda Scanlon
  But remember as well, every one of these sections is going to have a video that's going to introduce them to it and what they're about to do.  Yeah. Right. And then so to explain the caveats, because they don't know what they don't know. And the other part of that is that there'll also be, you know, documents as well that'll go with that that they can take a look at.  So they're going to have plenty of source and reference material, but we definitely want them to watch the video before they start trying to mess with this so that they know what their objective is.  And they'll see the property screen in Uconnect. So you're going to be able to edit these fields, change these, make these required.  And now you can go configure your property record. Then we have to explain to them what these fields are and what they do.  Some of them, they're not going to have a full understanding when you just look at it like parcel number.  On the property, you can continue to add. You can add 30 parcel numbers if that's what you need. Yeah, no, no.

14:06 - Edward Kruger (Realwired)
  So that's kind of... Yeah, we're on the same page. think, like, well, I'll just scroll down a bit. You know what I would like, Val, is what is that edit button on the top two?

14:18 - Val Vinnakota (brandcave.co)
  So currently we are looking at just a preview where the user, these are only view-only fields. We can get the sense of what they are expecting.  But if they don't like what they see, then they get into the configuration and start making changes.

14:37 - Sunda Scanlon
  So if it's locked, I can change it.

14:42 - Edward Kruger (Realwired)
  Yeah, I it's that idea of, like, you know, try before you buy, you know, so it kind of, like, gives you the preview before, and then you can modify the areas.  What do you think of this? What do you of of think of you think of What of think of What of of What

15:00 - Val Vinnakota (brandcave.co)
  What do I think of this? Yeah, do you think like that makes sense?

15:04 - Edward Kruger (Realwired)
  Because what I was trying to do is I was just trying to remove the anxiety. Because we're asking people to do a difficult thing, which is, you know, drag and drop fields to configure, you know, add new fields to configure like a, you know, property type.  And so for me, what I just wanted to do is I want to have them gradually go through this so that there's no anxiety, you know, associated with it.

15:30 - Sunda Scanlon
  Yeah, so what we always tell them, and this is true, our initial configurations that we do on a site is our initial configurations.  They don't know 100% until they get to user acceptance testing, but we have to have a standard configuration for them to be released to test, right?  So going through the process in the order that we do it in is the way we go. And as we do this, and which we'll be telling them on the video, is that this is not a final.  It is your... Best, you know, guess of your setup that you want. And then once you test if we need to add fields or remove fields, we're happy to do so.  So it's the initial configuration because they don't know until they really start trying to play with it. And you can't play with it until you have your stuff that has your look and feel that you're going to have, right?

16:16 - Edward Kruger (Realwired)
  So, Val, you know what I would want for this is could we make sure that the data that's actually entered here, like just pre-populated with some data, you know, so that people could just see it in action?  And then let's move the edit configuration button to the continue, which is static, because that way we know you've got one of two choices.  You're either editing this thing or you're continuing. You don't have to scroll up to kind of get to your edit action.

16:46 - Val Vinnakota (brandcave.co)
  This is a fork in the road.

16:48 - Edward Kruger (Realwired)
  The fork of the road is here that, you know, we either jumping into configuration or we skipping configuration because we are happy with what's being presented.  Exactly. That's what we usually do.

16:59 - Sunda Scanlon
  Sometimes they don't.

17:02 - Val Vinnakota (brandcave.co)
  Yeah, absolutely. That was the idea. If they like what they see, they can just continue, and of course, they can wait until they actually have their data and work it out to make the changes, but yeah.

17:12 - Edward Kruger (Realwired)
  Yeah, so I think the cool thing about us just pre-populating whatever this is, is that people get, when they're previewing it, they're seeing data in it, and so they have an association with it.  If you kind of like leave it blank, or even just with like these text boxes, what happens is, is that they feel like, oh, I'm not quite sure if I like this.  You know, I'm not quite sure what I'm supposed to do with it, and so let's just remove those empty states, you know, in the preview, and seed it, so that they can just kick off immediately.  Okay.

17:44 - Val Vinnakota (brandcave.co)
  Yeah, I can do that. Okay, so let's move on.

17:47 - Sunda Scanlon
  So, now the next thing, where I think we can use this, but we use it in a different manner when you go over to the request types.  So, the request form template, again. This would be a monumental thing for them to try and go because you have a bunch of different sections in your request form.  And so the thing that would be more advantageous for the user would be to have the request info section presented to them so they can first hear, they see all of it, right?  They could scroll and they have the whole form, which is a large form, right, of going through it, right?  They see a detailed view of it with it populated or something like I'd say, right? But then if they want to continue and they're going to edit, we present one section at a time.  And, you know, the first section is the request info in Uconnect, right? So the file number is automatically created.  The request status, project number, workflow stage, they don't adjust any of those. There's also an assignment status that should be up there that they don't adjust.  Then we have the request info section on the form, which is what they can adjust or if they want it.  Instead of loan officer. It's RM, you know, where they can relabel those types of things and stuff. And then we have the next section, which is the contact access info section, because we're going to have a little video for each of these sections.  So that's, you know, as they go through, they might say, OK, yep, nothing to do on contact access. Let me go to the next section.  That's the bid panel. Now is where I choose my bid panel. And now do I make any edits to my bid panel?  So going in the flow of the form. It'll make sense to them because that's the way the work flows as well.  They have the property information. Now they're giving the request info. Now they're giving the contact info. Now they're going to give the bid info and then the review info.  I am with you on that, Sundar.

19:47 - Val Vinnakota (brandcave.co)
  I guess that's the way I'm trying to do the patterns. Maybe I'm calling the sections wrong and maybe I missed a section.  But yeah, like once they have seen the full picture of what it looks like, but they're getting, they get to edit.  The individual sections, but I'm calling it overview where these are the essential fields and next is the advanced fields.  I guess I have to split this into the contact info section as well. But yeah, like moving forward is when the bid panel engagement starts.  Yep.

20:17 - Sunda Scanlon
  So can we just go back to that one quickly?

20:21 - Edward Kruger (Realwired)
  You know what I'm just thinking out loud, Val, is, you know, that button at the bottom, you know, that kind of like navigates me through the flow here.  You know, it's been wonderful because I feel like I'm progressing section for section. Like what I would be worried about is what would be confusing for me is that the moment I get into the edit screen, that now suddenly I'm progressing section by section as well.  You know, I'm not going to know that intuitively.

20:51 - Val Vinnakota (brandcave.co)
  Mm-hmm.

20:53 - Edward Kruger (Realwired)
  And so what I'm wondering just from that intuitive perspective is do we maybe just want to have a tag?  Have you on the bot, you know, on the top that shows the different sections that you can kind of like select and then have that button just save and jump to the next section, you know, rather than it.  Or, you know, to the verification step, you know, which might be a step just to say like, hey, listen, you, you, you edit everything or you're happy, but you, you get what I'm trying to get at?  No, totally. Like, I mean, two things I can address here.

21:28 - Val Vinnakota (brandcave.co)
  I totally understand the next button kind of loses its consistency of progression once we get into the edit mode.  So I'm definitely with you if I want to delineate between this and the, you know, edit parts, the steps in the edit part.  But what I wouldn't want to do is the tabs because that would indicate that user can skip tabs, but they essentially need to every step.

21:52 - Edward Kruger (Realwired)
  Yeah, I agree. So could we, could we do, could we then at least have like some sort A of information, you know, pop up and into the static bottom on the bottom, you know, that says like, well, yeah, why I was saying shorten it.

22:13 - Sunda Scanlon
  So if you go back and get another page, you know, how you have the template selection. So if I was here and I saw your request form template, the first thing is request information, right?  And if I click on that, I finished that out. Yay, I finished it. My next thing I would go to is this one.  So I can see on this, kind of like you do with your progress stuff. Okay, the request info on the request is done now.  Now I'm in the contact access info section. Let me do that one. That sums it up in the small bites that they know, okay, I completed that one.  Now I'm on the engagement panel section.

22:50 - Edward Kruger (Realwired)
  I'm just like, what's happening with that for me is that, you know, right now, like on this view, you kind of like had an overview.  I of like, yeah, you're going to now tackle this massive section. And if you kind of like break it down into, you're now on the next chapter, you're now on the next chapter, you know, what happens is when you are so focused maybe now on the context session that you lose the context of what you did earlier.  So let's say like you took a break halfway through, you know, and now you just focus up today and you want to finish the context session.  I wouldn't want someone to lose, you know, the thread, so to speak.

23:32 - Sunda Scanlon
  Well, why can't you just hit preview and it shows you what you have so far? So it would, if you hit preview, it's not an edit mode, it just pops up and shows, here's your request info panel, here's your contact access.  Okay, Val, this is a difficult solution.

23:45 - Edward Kruger (Realwired)
  So we're looking at you like, you've heard all constraints and concerns. Can you, can you figure out some patterns that would maybe help you?  Yeah, absolutely. Yeah.

23:58 - Val Vinnakota (brandcave.co)
  I was hoping the breadcrumbs itself. A of it solved some of our problem, but yeah, like you, you pointed it out, man.  Like, yeah, absolutely. I'll, I'll make it more clear. Yeah.

24:08 - Edward Kruger (Realwired)
  Let's see if we can explore some options there, you know, and which one works for us, Sana. Yeah. Because it's going to be this thing.  I think it's going to be this thing where we would need to play with it and feel it to see, you know, what works and what doesn't work.  Yep.

24:25 - Sunda Scanlon
  I know just the people, you know, even if we think it's good, Ed, I know the people in CS I can put on it that are a little less technical.

24:33 - Edward Kruger (Realwired)
  Yeah. But I understand the workflow so I can see what their reaction is.

24:37 - Sunda Scanlon
  Like I say, you walk me through this and let me see what you do. Yeah. Yeah. Yeah. So I can see where they get stuck.

24:41 - Edward Kruger (Realwired)
  Like, what do I do here? Then I know, okay, , we need to answer that.

24:44 - Sunda Scanlon
  So I will take my least knowledgeables, but they still understand at least general system.

24:50 - Edward Kruger (Realwired)
  Right.

24:50 - Sunda Scanlon
  And let me see what they, let me see if they can make it through it once we, once we set the rest of this up.  Because if I take. The more technicals, they're going to be able to go through it, no matter what, just because we have the technical brain, right?  We can't help ourselves. We know, okay, well, this is logical. We go to here. Some of my others are not so logical in that manner.

25:15 - Val Vinnakota (brandcave.co)
  Awesome. So whatever I have today here, Sunda, it is present on the latest link. So feel free to explore that.  But while I work on redesigning this page to be more, you know, clearer. Yeah. Yep.

25:33 - Sunda Scanlon
  And then, you we're going to have more modules for you because as we're breaking it down, you know, like through general settings, there's more and more things or whatever.  So and we really have to go in a specific order for them to progress and understand what they're really filling out.  But the biggest thing is going to be the videos that we're making to show the instruction, which is why I want to kind of get a similar type platform for here so they can start making those.  you. They can't really make them without being able to see what we're doing here to give a good explanation.  They can do the overview from the Uconnect point of view, but then they want to give a little instruction of, okay, so now that you know this is the property record, this is what it serves, these are the field types, now you're going to go configure your stream, you know, in order to create your property record.  And then they can, you know, then they'll go over here and they need to understand how to, you know, progress there.  But I think it's pretty easy on, on, from my standpoint on this of how they would start. When Missy, when I, when I popped this up, what got me about this one was, Missy was like, what do you mean property templates?  What's a property template? Why would we have a, I was like, oh Lord, calm down. I was like, I don't know.  I'm not sure, but no, we don't have property templates. She's like, that's going to make everybody think they can have a different one for different property types.  And she's like, no, I said, no, no, no. I was like, this is just stuff they're trying on the UI after I talked to Ed, because I was like, oh no.  So, so, but yeah, so it's one of those things where. Um. We just want to make sure that they were liking the continuity the way it was kind of flowing where they could understand and they knew the client would understand.  So I just don't want to make it to where we think it has to be so intuitive that there's no instruction needed because no matter what, we're going to have to give some instruction with each of the sections because it doesn't matter how intuitive this is.  The client is looking for the best business practice, which you can't show in here. It depends on what their scenario is.  So we can discuss that a little bit on the videos that we make. Yeah.

27:34 - Edward Kruger (Realwired)
  Fair enough. I have a question for you, Sunda.

27:36 - Val Vinnakota (brandcave.co)
  I did receive the worksheets, but they are dated almost a month back. If you have anything latest on that, share them at your leisure.

27:46 - Sunda Scanlon
  Yeah, they're finishing up some other things with like the questions we need answered to go through general settings to make those kind of other configurations and stuff.  But it's about to get a little bit slowed down because most of them are out the next two weeks.  So it'll pick back up in January. So I don't know if I'll have much for you prior to then.  No problem.

28:07 - Val Vinnakota (brandcave.co)
  Like I will implement the general settings. I have, I mean, I have avoided it for a while expecting I would get more from you.  But I can, I think with my current knowledge, I'll try to fill that section up. And of course, we can always iterate that once you come back.  But I'll ask Missy if I can get the general setting, if I can send you the general settings doc.

28:28 - Sunda Scanlon
  And if I can, then I'll just email it to you because I knew they were finishing it up. And I just approved it for the questions they had on it.  Yeah, awesome. That would be appreciated.

28:37 - Val Vinnakota (brandcave.co)
  Okay. All right. That's what I got. And of course, like for you, one thing you also started doing was you were, you know, you were asked for understanding the patterns that are reusable so that they would be able to get the components.  So, yeah, we are trying to break them into, you know, your modules, your feedback, your forums, your hero banners and stuff like that.  really.

29:00 - Edward Kruger (Realwired)
  Right, yeah.

29:04 - Val Vinnakota (brandcave.co)
  And then anatomy, etc. Yeah, I guess we're going to have a whole package when we do the handoff. Oh, that's awesome.

29:14 - Sunda Scanlon
  Awesome, awesome. Yeah, no, I think it looks great. I love every time, you know, there's some changes because you can really see, okay, these are system fields.  I love that. And so they can't change those.

29:25 - Val Vinnakota (brandcave.co)
  So, yeah. Yeah, and it's also going to get a little bit of a design revamp as well because we have been just doing the functional requirements so far and it's knowledgeable about it.  Kodi and I will have to sit through and refine the UX and UI a little bit so we can actually see what the final product is going to look like.  And that's going to happen pretty soon in the next couple of weeks.

29:48 - Sunda Scanlon
  Okay. Perfect.

29:50 - Edward Kruger (Realwired)
  Perfect.

29:52 - Sunda Scanlon
  And I'll get you any other information. I'll talk to Missy in just a few and I'll tell her I need any other information from her that I'm able to hand over.  Bye. I had a bunch of documents she sent me to approve, so I'll see if there's anything else. I'll her if there's some minor changes if we go forward, no big deal, but let's at least get more data to you.  Is there anything else that we need to talk about today?

30:14 - Edward Kruger (Realwired)
  That's about it, I mean, yeah.

30:15 - Val Vinnakota (brandcave.co)
  Awesome.

30:17 - Sunda Scanlon
  Cool. All right, guys, I appreciate you.

30:20 - Edward Kruger (Realwired)
  Happy holidays. holidays.

30:23 - Val Vinnakota (brandcave.co)
  Bye. Happy holidays. holidays. Happy holidays. Happy Happy You
