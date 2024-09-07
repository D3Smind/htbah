export default class HTBAHActor extends Actor {

    prepareDerivedData() {
        const system_data = this.system;

        // skills are only relevant for pc and npc
        if(this.type == 'pc' || this.type == 'npc')
        {
            let skillPointsSpent = [0,0,0];
            for (let i = 0; i < this.items.length; ++i) {
                if(this.items[i].type == 'skill') {
                    //if for some reason skill point are not saved as int, convert them
                    let currentSkillPoints = parseInt(this.items[i].data.points, 10);
                    let currentSkillCategory = parseInt(this.items[i].data.category, 10);
                    if(!isNaN(currentSkillPoints) && !isNaN(currentSkillCategory))
                    {
                        skillPointsSpent[currentSkillCategory] += currentSkillPoints;
                    }
                }
            }
            const actionPoints = Math.round(skillPointsSpent[0]/10);
            const knowledgePoints = Math.round(skillPointsSpent[1]/10);
            const socialPoints = Math.round(skillPointsSpent[2]/10);

            system_data.action.points = actionPoints;
            system_data.knowledge.points = knowledgePoints;
            system_data.social.points = socialPoints;
        }

        //limit HP
        if(system_data.health.value > system_data.health.max) system_data.health.value = system_data.health.max;
    }
}