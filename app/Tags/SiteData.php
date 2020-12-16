<?php

namespace App\Tags;
use DateTime;
use Statamic\Tags\Tags;

class SiteData extends Tags
{
    /**
     * The {{ site_data }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        //
    }

    /**
     * The {{ site_data:openingHours }} tag.
     *
     * @return string|array
     */
    public function lineClosed()
    {
        $amNY = new DateTime('Europe/London');
        $estTime = $amNY->format('H');
        $weekday = $amNY->format('D');
        $amNY2 = new DateTime('Asia/Kolkata');
        $estTime2 = $amNY2->format('H');
        $lineClosed = false;
        //$weekday = "Fri"; //test day
        //$estTime = 7; //test time
        if ($weekday == "Sun") { //Sunday #lines-closed
            $lineClosed = true;
        } else if ($weekday == "Sat") { //Saturday
            $satmin = 9;
            $satmax = 14;
            if (($satmin <= $estTime) && ($satmax >= $estTime)) { //#lines-open
                $lineClosed = false;
            } else {
                $lineClosed = true;
            }
        } else if ($weekday == "Fri") { //Friday
            $satmin = 8;
            $satmax = 17;
            if (($satmin <= $estTime) && ($satmax >= $estTime)) { //#lines-open
                $lineClosed = false;
            } else { //#lines-closed
                $lineClosed = true;
            }
        } else { //Mon-Thurs
            $min = 8;
            $max = 19;
            if (($min <= $estTime) && ($max >= $estTime)) { //#lines-open
                $lineClosed = false;
            } else { //#lines-closed
                $lineClosed = true;
            }
        }
        return $lineClosed;
    }
}
