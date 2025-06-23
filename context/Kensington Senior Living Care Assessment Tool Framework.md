# Care Assessment Form

### **Kensington Senior Living**

### ---

### **Welcome / Introduction**

Display a friendly intro that reassures users:

*“Not sure what kind of care your loved one needs? We’re here to help. By answering a few quick questions, you’ll receive personalized guidance from our team—whether you’re planning ahead or seeking immediate support.”*

Include a progress bar or step counter for clarity.

### **User Input Questions**

#### **Step 1: Who is this assessment for?**

* Myself

* Spouse

* Father or Mother

* Sibling

* Friend or Other Family Member

#### **Step 2: Current Challenges *(Multiple select)***

* Memory loss

* Falling or almost falling

* Walking difficulties

* Getting up from bed

#### **Step 3: Support Needed *(Multiple select)***

* Managing medications

* Dressing

* Eating meals

* Using the bathroom

* Attending medical visits

* Bathing & showering

#### **Step 4: 24/7 Care Needs**

* Do they require round-the-clock care or supervision?

  * Yes

  * No

  * Not sure

#### **Step 5: Age Input**

* Open number field

#### **Step 6: Current Living Situation**

* At home with no help

* At home with part-time professional help

* At home with 24/7 professional help

* At home with spouse/family member

* Already in assisted living

#### **Step 7: Wandering or Disorientation Concerns**

* Yes

* No

* Not sure

#### **Step 8: Primary Concerns *(Multiple select)***

* Unsafe current living situation

* Need more help than the family can provide

* Loneliness or isolation

* Need help with some basic care needs

* Just exploring future senior living options

#### **Step 9: Financial Considerations *(Multiple select)***

* Veteran or Spouse of Veteran

* Has Long-Term Care Insurance

* On Medicaid

#### **Step 10: Memory Condition Diagnosis**

* Has your loved one been diagnosed with Alzheimer’s, dementia, or another memory-related condition?

  * Yes

  * No

  * Not sure

#### **Step 11: Readiness to Move**

* Yes, I’m ready to make a move

* No, I’m just gathering information

### **Results Logic & Recommendation Engine**

Use a **scoring or conditional logic model** behind the scenes to match responses to a recommendation:

* **Memory Care Recommendation** triggers if:

  * Memory loss or wandering is selected

  * Alzheimer’s/dementia diagnosis \= Yes

  * 24/7 care needs \= Yes or Not sure

  * Support needs include safety, confusion, or isolation

* **Assisted Living Recommendation** triggers if:

  * Challenges are mostly physical (falling, walking, dressing)

  * No memory issues reported

  * Minimal supervision required

  * Looking for support with daily living but maintains independence

Include language like:

*“Based on your responses, Assisted Living may be a great fit for your loved one.”*  
 or  
 *“Your answers suggest Memory Care might provide the level of support and safety your loved one needs.”*

### **4\. Contact Capture & Follow-Up**

**Final Step:**  
 Prompt users to share contact information:

* Name

* Phone

* Email

* Best time to contact

*“Thank you\! Our team will review your assessment and follow up shortly with personalized guidance and next steps.”*

